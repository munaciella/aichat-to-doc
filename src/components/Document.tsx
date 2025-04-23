"use client";

import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import { DownloadCloud, Trash2Icon, PencilIcon } from "lucide-react";
import useSubscription from "../../hooks/useSubscription";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { deleteDocument } from "../../actions/deleteDocument";
import { renameDocument } from "../../actions/renameDocument";

const Document = ({
  id,
  name,
  size,
  downloadUrl,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
}) => {
  const router = useRouter();
  const { hasActiveMembership } = useSubscription();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  return (
    <>
      <div
        className="flex flex-col w-36 h-48 lg:w-60 lg:h-72 rounded-xl bg-gray-200 dark:bg-gray-900 shadow-lg p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white cursor-pointer group"
        onClick={() => router.push(`/dashboard/files/${id}`)}
      >
        <div className="flex-1">
          {/* ✅ Document Name - Truncate to prevent overflow */}
          <p className="font-semibold truncate text-gray-900 dark:text-gray-100 group-hover:text-white">
            {name}
          </p>

          {/* ✅ Show first 4 characters of the ID */}
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-indigo-100">
            {id.slice(0, 4)}...
          </p>

          {/* ✅ File Size */}
          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-100">
            {byteSize(size).value} KB
          </p>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex flex-row space-x-1 justify-end md:space-x-2">
          {/* ✅ Delete Button */}
          <Button
            variant="outline"
            className={
              !hasActiveMembership
                ? "opacity-50 cursor-not-allowed hover:bg-transparent h-8 w-8 lg:h-9 lg:w-11"
                : "cursor-pointer h-8 w-8 lg:h-9 lg:w-11"
            }
            onClick={(e) => {
              e.stopPropagation();
              if (!hasActiveMembership) {
                toast.error(
                  "This is a PRO feature, please upgrade to delete documents.",
                  {
                    duration: 5000,
                    style: { backgroundColor: "#DC2626", color: "white" },
                    action: {
                      label: "Upgrade",
                      onClick: () => router.push("/dashboard/upgrade"),
                    },
                  }
                );

                return;
              }
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2Icon className="h-6 w-6 text-red-500 dark:text-red-300" />
          </Button>

          {/* ✅ Download Button */}
          <Button variant="outline" asChild className="h-8 w-8 lg:h-9 lg:w-11">
            <a href={downloadUrl} download>
              <DownloadCloud className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </a>
          </Button>

          {/* ✅ Rename Button */}
          <Button
            variant="outline"
            className="h-8 w-8 lg:h-9 lg:w-11 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsRenameDialogOpen(true);
            }}
          >
            <PencilIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete <strong>{name}</strong>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteDocument(id);
                  toast.success("Document deleted successfully.", {
                    style: { backgroundColor: "#16A34A", color: "white" },
                  });
                } catch (error) {
                  console.error("Error deleting document:", error);
                  toast.error("Failed to delete document. Please try again.", {
                    style: { backgroundColor: "#DC2626", color: "white" },
                  });
                } finally {
                  setIsDeleteDialogOpen(false);
                }
              }}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
          </DialogHeader>
          <p>Enter a new name for the document:</p>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                const result = await renameDocument(id, newName);
                if (result.success) {
                  toast.success("Document renamed successfully.", {
                    style: { backgroundColor: "#16A34A", color: "white" },
                  });
                  setIsRenameDialogOpen(false);
                } else {
                  toast.error(result.message, {
                    style: { backgroundColor: "#DC2626", color: "white" },
                  });
                }
              }}
            >
              Confirm Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Document;
