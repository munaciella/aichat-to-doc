import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex justify-between bg-white dark:bg-gray-900 shadow-sm dark:shadow-md p-5 border-b dark:border-gray-700">
      <Link href="/dashboard" className="text-2xl font-semibold text-gray-900 dark:text-white">
        Chat to <span className="text-indigo-600 dark:text-indigo-400">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="hidden md:flex text-gray-900 dark:text-gray-300">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-indigo-600 dark:border-indigo-400">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600 dark:text-indigo-400" />
            </Link>
          </Button>

          {/* User Button */}
          <UserButton />

          {/* Theme Toggle - Styled for dark mode */}
          <ThemeToggle />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
