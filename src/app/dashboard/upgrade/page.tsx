/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PricingPage = () => {
    const {user} = useUser();
    const router = useRouter();
    // pull in user subscription
  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Supercharge your Document Companion
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600 dark:text-gray-300">
          Choose an affordable plan that&apos;s packed with the best features
          for interacting with your PDFs, enhancing productivity, and
          streamlining your workflow.
        </p>

        <div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
          {/* Free plan */}
          <div className="ring-1 ring-gray-300 dark:ring-gray-600 p-8 h-fit pb-12 rounded-3xl">
            <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Explore Core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Free
              </span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                2 Documents
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Up to 3 messages per document
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Try out the AI Chat Functionality
              </li>
            </ul>
          </div>

          {/* Paid plan */}
          <div className="ring-2 ring-indigo-600 dark:ring-indigo-400 rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Maximise Productivity with PRO Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                £5.99
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">
                /month
              </span>
            </p>

            <Button className="bg-indigo-600 dark:bg-indigo-400 w-full text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-300 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400">
              Upgrade to Pro
            </Button>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Store up to 20 Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Ability to Delete Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Up to 100 Messages per Document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Full Power AI Chat Functionality with Memory Recall
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Advanced Analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                24-Hour Support Response Time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
