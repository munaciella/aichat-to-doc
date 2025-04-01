// import { SignedIn, UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { FilePlus2 } from "lucide-react";
// import { ThemeToggle } from "./ThemeToggle";
// import UpgradeButton from "./UpgradeButton";

// const Header = () => {
//   return (
//     <div className="flex justify-between bg-white dark:bg-gray-900 shadow-sm dark:shadow-md p-5 border-b dark:border-gray-700">
//       <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
//         <span className="text-indigo-600 dark:text-indigo-400">Paperly</span>
//       </Link>

//       <SignedIn>
//         <div className="flex items-center space-x-2">
//           <Button asChild variant="link" className="hidden md:flex text-gray-900 dark:text-gray-300">
//             <Link href="/dashboard/upgrade">Pricing</Link>
//           </Button>

//           <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300">
//             <Link href="/dashboard">My Documents</Link>
//           </Button>

//           <Button asChild variant="outline" className="border-indigo-600 dark:border-indigo-400">
//             <Link href="/dashboard/upload">
//               <FilePlus2 className="text-indigo-600 dark:text-indigo-400" />
//             </Link>
//           </Button>

//           <UpgradeButton />
//           <UserButton />

//           <ThemeToggle />
//         </div>
//       </SignedIn>
//     </div>
//   );
// };

// export default Header;

"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import UpgradeButton from "./UpgradeButton";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import logo from "../../public/paperly.png";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/70 dark:border-gray-700/50">
      {/* ✅ Mobile Menu (SM Only) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 size-0 mr-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 py-16 px-2">

            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Access links to dashboard sections
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col space-y-4">
              <SheetClose asChild>
                <Button asChild variant="ghost">
                  <Link href="/dashboard/upgrade">Pricing</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button asChild variant="outline">
                  <Link href="/dashboard">My Documents</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button asChild variant="outline">
                  <Link href="/dashboard/upload">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      Upload
                    </span>
                    <FilePlus2 className="text-indigo-600 dark:text-indigo-400" />
                  </Link>
                </Button>
              </SheetClose>

              <UpgradeButton />
            </div>

            {/* ✅ Close Button */}
            <SheetClose asChild>
              <Button variant="outline" className="w-full mt-4">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      {/* ✅ Centered Logo + "Paperly" (SM+ Screens) */}
      {/* <Link
  href="/"
  className="text-2xl font-semibold text-gray-900 dark:text-white flex-1 text-center 
     md:text-left md:ml-8"
>
  <span className="text-indigo-600 dark:text-indigo-400">Paperly</span>
</Link> */}
      <div className="flex-1 flex flex-col items-center ml-10 md:items-start md:ml-6">
        <Link href="/" className="flex flex-col items-center md:items-start">
          <Image
            src={logo}
            alt="Paperly Logo"
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <span className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold -mt-2">
            Paperly
          </span>
        </Link>
      </div>

      {/* ✅ Desktop Nav (MD+ Screens Only) */}
      <SignedIn>
        <nav className="hidden md:flex items-center space-x-2">
          <Button
            asChild
            variant="link"
            className="text-gray-900 dark:text-gray-300"
          >
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300"
          >
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-indigo-600 dark:border-indigo-400"
          >
            <Link href="/dashboard/upload">
              <span className="text-indigo-600 dark:text-indigo-400">
                Upload
              </span>
              <FilePlus2 className="text-indigo-600 dark:text-indigo-400" />
            </Link>
          </Button>

          <UpgradeButton />
        </nav>
      </SignedIn>
      {/* ✅ Right-Side: User Button & Theme Toggle */}
      <div className="flex items-center space-x-2 ml-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
