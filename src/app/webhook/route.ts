// import stripe from "@/lib/stripe";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { adminDb } from "../../../firebaseAdmin";

// export async function POST(req: NextRequest) {
//     const headersList = await headers();
//     const body = await req.text();
//     const signature = headersList.get("stripe-signature");

//     // Dynamically use the correct webhook secret
//     const webhookSecret =
//       process.env.NODE_ENV === "production"
//         ? process.env.STRIPE_WEBHOOK_SECRET_PROD
//         : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

//     if (!signature) {
//         return new Response("Missing Stripe signature", { status: 400 });
//     }

//     if (!webhookSecret) {
//         console.log("STRIPE_WEBHOOK_SECRET is not defined");
//         return new NextResponse("Stripe webhook secret is not defined", { status: 400 });
//     }

//     let event: Stripe.Event;

//     try {
//         event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//     } catch (error) {
//         console.error(`error: ${error}`);
//         return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
//     }

//     const getUserDetails = async (customerId: string) => {
//         const userDoc = await adminDb
//         .collection("users")
//         .where("stripeCustomerId", "==", customerId)
//         .limit(1)
//         .get();

//         if (!userDoc.empty) {
//             return userDoc.docs[0];
//         }
//     };

//     // TODO: Add logic to handle the different event types
//     // invoice.payment_failed
// 	// customer.subscription.updated
//     switch (event.type) {
//         case "checkout.session.completed":
//         case "payment_intent.succeeded": {
//             const invoice = event.data.object;
//             const customerId = invoice.customer as string;

//             const userDetails = await getUserDetails(customerId);
//             if (!userDetails) {
//                 return new NextResponse("User not found", { status: 404 });
//             }

//             await adminDb.collection("users").doc(userDetails?.id).update({
//                 hasActiveMembership: true,
//             });

//             break;
//         }
//         case "customer.subscription.deleted":
//         case "subscription_schedule.canceled": {
//             const subscription = event.data.object as Stripe.Subscription;
//             const customerId = subscription.customer as string;

//             const userDetails = await getUserDetails(customerId);
//             if (!userDetails?.id) {
//                 return new NextResponse("User not found", { status: 404 });
//             }

//             await adminDb.collection("users").doc(userDetails?.id).update({
//                 hasActiveMembership: false,
//             });
//             break;
//         }

//         default:
//             console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ message: "Webhook received" }, { status: 200 });
// }

import stripe from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '../../../firebaseAdmin';

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const body = await req.text();
  const signature = headersList.get('stripe-signature');

  const webhookSecret =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_WEBHOOK_SECRET_PROD
      : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

  if (!signature) {
    return new NextResponse('Missing Stripe signature', { status: 400 });
  }

  if (!webhookSecret) {
    console.log('Stripe webhook secret is not defined');
    return new NextResponse('Stripe webhook secret is not defined', {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const getUserDetails = async (customerId: string) => {
    const userSnapshot = await adminDb
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return null;
    }

    return userSnapshot.docs[0];
  };

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;

        console.log('Checkout completed for customer:', customerId);

        const userDetails = await getUserDetails(customerId);

        if (!userDetails) {
          console.log('User not found for customer:', customerId);
          return new NextResponse('User not found', { status: 404 });
        }

        await adminDb.collection('users').doc(userDetails.id).set(
          {
            hasActiveMembership: true,
          },
          { merge: true },
        );

        console.log('User upgraded:', userDetails.id);
        break;
      }

      case 'invoice.paid':
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        console.log('Invoice paid for customer:', customerId);

        const userDetails = await getUserDetails(customerId);

        if (!userDetails) {
          console.log('User not found for customer:', customerId);
          return new NextResponse('User not found', { status: 404 });
        }

        await adminDb.collection('users').doc(userDetails.id).set(
          {
            hasActiveMembership: true,
          },
          { merge: true },
        );

        console.log('User membership confirmed:', userDetails.id);
        break;
      }

      case 'invoice.payment_failed':
      case 'customer.subscription.deleted': {
        const object = event.data.object as
          | Stripe.Invoice
          | Stripe.Subscription;
        const customerId = object.customer as string;

        console.log('Membership inactive event for customer:', customerId);

        const userDetails = await getUserDetails(customerId);

        if (!userDetails) {
          console.log('User not found for customer:', customerId);
          return new NextResponse('User not found', { status: 404 });
        }

        await adminDb.collection('users').doc(userDetails.id).set(
          {
            hasActiveMembership: false,
          },
          { merge: true },
        );

        console.log('User downgraded:', userDetails.id);
        break;
      }

      default:
        console.log('Unhandled Stripe event:', event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Stripe webhook handler error:', error);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}
