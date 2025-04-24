'use server';

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";
import stripe from "@/lib/stripe";
import getBaseUrl from "@/lib/getBaseUrl";

export async function createStripePortal() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await adminDb.collection("users").doc(userId).get();
    const stripeCustomerId = user.data()?.stripeCustomerId;

    if (!stripeCustomerId) throw new Error("User does not have a Stripe customer ID");

    const returnUrl = `${getBaseUrl()}/dashboard`;
    console.log("🔹 Stripe Portal Return URL:", returnUrl);

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    console.log("🔹 Stripe Portal URL:", session.url);
    return session.url;
  } catch (error) {
    console.error("🚨 Stripe Portal Error:", error);
    throw error;
  }
}
