import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "../../../firebaseAdmin";

export async function POST(req: NextRequest) {
    const headersList = await headers();
    const body = await req.text();
    const signature = headersList.get("stripe-signature");

    // Dynamically use the correct webhook secret
    const webhookSecret =
      process.env.NODE_ENV === "production"
        ? process.env.STRIPE_WEBHOOK_SECRET_PROD
        : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

    if (!signature) {
        return new Response("Missing Stripe signature", { status: 400 });
    }

    if (!webhookSecret) {
        console.log("STRIPE_WEBHOOK_SECRET is not defined");
        return new NextResponse("Stripe webhook secret is not defined", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error(`error: ${error}`);
        return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
    }

    const getUserDetails = async (customerId: string) => {
        const userDoc = await adminDb
        .collection("users")
        .where("stripeCustomerId", "==", customerId)
        .limit(1)
        .get();

        if (!userDoc.empty) {
            return userDoc.docs[0];
        }
    };

    // TODO: Add logic to handle the different event types
    // invoice.payment_failed
	// customer.subscription.updated
    switch (event.type) {
        case "checkout.session.completed":
        case "payment_intent.succeeded": {
            const invoice = event.data.object;
            const customerId = invoice.customer as string;

            const userDetails = await getUserDetails(customerId);
            if (!userDetails) {
                return new NextResponse("User not found", { status: 404 });
            }

            await adminDb.collection("users").doc(userDetails?.id).update({
                hasActiveMembership: true,
            });

            break;
        }
        case "customer.subscription.deleted":
        case "subscription_schedule.canceled": {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            const userDetails = await getUserDetails(customerId);
            if (!userDetails?.id) {
                return new NextResponse("User not found", { status: 404 });
            }

            await adminDb.collection("users").doc(userDetails?.id).update({
                hasActiveMembership: false,
            });
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
