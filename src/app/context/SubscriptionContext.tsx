"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useSubscription from "../../../hooks/useSubscription";

type SubCtx = ReturnType<typeof useSubscription>;
const SubscriptionContext = createContext<SubCtx | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const sub = useSubscription();
  return (
    <SubscriptionContext.Provider value={sub}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("Must be inside SubscriptionProvider");
  return ctx;
}
