export const dynamic = "force-dynamic";

import DashboardClient from "@/components/DashboardClient";
import Documents from "@/components/Documents";

const DashboardPage = () => {

  return (
    <div className="h-full max-w-7xl mx-auto mt-4 p-2">
      <h1 className="text-3xl p-5 dark:bg-background font-light text-indigo-600 dark:text-indigo-400">My Documents</h1>

        <DashboardClient />
        <Documents />
    </div>
  );
}

export default DashboardPage