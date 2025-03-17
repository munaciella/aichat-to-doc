'use client';

import useSubscription from "../../hooks/useSubscription";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { createStripePortal } from "../../actions/createStripePortal";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const UpgradeButton = () => {
    const { hasActiveMembership, loading } = useSubscription();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAccount = () => {
         startTransition(async () => {
           const stripePortalUrl =  await createStripePortal();
           router.push(stripePortalUrl)
         })
    }

    if (!hasActiveMembership && !loading)
        return (
    <Button asChild variant="default" className="border-indigo-600 dark:border-indigo-400">
       <Link href="/dashboard/upgrade">
       Upgrade <StarIcon className="fill-indigo-600 dark:fill-indigo-400 text-white dark:text-gray-800" />
         </Link>
    </Button>
    )

    if (loading)
        return (
    <Button variant="default" className="border-indigo-600 dark:border-indigo-400">
        <Loader2Icon className="animate-spin" />
    </Button>
    )

  return (
    <Button
    onClick={handleAccount}
    disabled={isPending}
    variant="default"
    className="border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400 cursor-pointer hover:bg-indigo-700 dark:hover:bg-indigo-500"
    >
        {isPending ? (
            <Loader2Icon className="animate-spin" />
        ) : (
            <p>
                <span className="font-extrabold">PRO</span>{" "}
                Account
            </p>
        )}
    </Button>
  )
}

export default UpgradeButton
