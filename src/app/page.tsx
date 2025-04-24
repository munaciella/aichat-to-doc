"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    name: "Store your Documents",
    description:
      "Keep all your important documents securely stored and easily accessible anytime, anywhere.",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description:
      "Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Our intelligent chatbot remembers previous interactions, providing a seamless and personalised experience.",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF Viewer",
    description:
      "Engage with your docs like never before using our intuitive and interactive viewer.",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Across Devices",
    description:
      "Access and chat with your docs seamlessly on any device, whether it's your desktop, tablet, or smartphone.",
    icon: MonitorSmartphoneIcon,
  },
];

export default function Home() {
  const { isSignedIn } = useAuth();

  const handleClick = () => {
    if (isSignedIn) {
      toast.info("Redirecting to dashboard...",{
        style: { backgroundColor: "#2563EB", color: "white" },
      });
    } else {
      toast.warning("You need to be signed in to get started.", {
        description: "Redirecting to sign in page...",
        style: { backgroundColor: "#EAB308", color: "white" },
        
      });
      localStorage.setItem("showSignInToast", "true");
    }

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 600);
  };

  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600 dark:bg-black dark:text-white">
      {/* <ThemeToggle /> */}
      <div className="relative bg-white dark:bg-gray-900 py-24 sm:py-32 rounded-md drop-shadow-xl">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-lg font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Transform Your Docs into Interactive Conversations
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Introducing{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                Paperly
              </span>
              <br />
              <br /> Upload your document, and our chatbot will respond to your
              questions, summarise content, and provide the answers you need. 
              Perfect for everyone,{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Paperly
              </span>{" "}
              transforms static documents into{" "}
              <span className="font-bold">dynamic conversations</span>,
              effortlessly boosting productivity tenfold.
            </p>
          </div>
          <Button onClick={handleClick} className="mt-10 lg:p-6 cursor-pointer">
            Get Started
          </Button>
        </div>

        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="https://i.imgur.com/VciRSTI.jpeg"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 dark:from-transparent pt-[6%]" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900 dark:text-white">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  />
                  {feature.name}
                </dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
