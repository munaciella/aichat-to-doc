/* eslint-disable react/no-unescaped-entities */
"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircleIcon,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import useUpload, { StatusText } from "../../hooks/useUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSubscription from "../../hooks/useSubscription";

const FileUploader = () => {
  const { progress, status, fileId, handleUpload } = useUpload();
  const { isOverFileLimit, refetchLimit } = useSubscription();
  const router = useRouter();

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [progress]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        toast.warning("Please select a valid file.", {
          style: { backgroundColor: "#EAB308", color: "white" },
        });
        return;
      }

      if (isOverFileLimit) {
        toast.error("Free plan file limit reached.", {
          style: { backgroundColor: "#DC2626", color: "white" },
          duration: 5000,
          description: "Please upgrade to upload more files.",
          action: {
            label: "Upgrade",
            onClick: () => {
              router.push("/dashboard/upgrade");
            },
          },
        });
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        toast.warning("File is too large (max 3MB)", {
          description: "Support for larger files coming soon.",
          style: { backgroundColor: "#EAB308", color: "white" },
        });
        return;
      }

      const toastId = toast.loading(`Uploading ${file.name}...`, {
        style: { backgroundColor: "#2563EB", color: "white" },
      });

      try {
        await handleUpload(file);

        toast.success(`${file.name} uploaded successfully!`, {
          id: toastId,
          style: { backgroundColor: "#16A34A", color: "white" },
        });
      } catch (error) {
        console.error("Upload error:", error);
        if (error instanceof Error && error.message?.includes("Upload limit reached")) {
          // 👇 Immediately trigger refetch to update UI
          refetchLimit?.();
          router.refresh();
        }        toast.error(`Failed to upload ${file.name}. Please try again.`, {
          id: toastId,
          style: { backgroundColor: "#DC2626", color: "white" },
        });
      }
    },
    [handleUpload, isOverFileLimit, refetchLimit, router]
  );

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: (
      <RocketIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400" />
    ),
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400" />
    ),
    [StatusText.SAVING]: (
      <SaveIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400" />
    ),
    [StatusText.GENERATING]: (
      <HammerIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400 animate-bounce" />
    ),
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "text/plain": [".txt"],
        "text/markdown": [".md"],
        "application/rtf": [".rtf"],
      },
    });

  const isUploading = status === StatusText.UPLOADING;
  const showStatus = status !== StatusText.UPLOADING && status !== null;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto cursor-pointer">
      {isUploading && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          {progress !== null && (
            <div
              key={refreshTrigger}
              className="radial-progress bg-indigo-300 dark:bg-indigo-700 text-white border-indigo-600 dark:border-indigo-400 border-4"
              role="progressbar"
              style={
                {
                  "--value": progress ?? 0,
                  "--size": "12rem",
                  "--thickness": "1.3rem",
                } as React.CSSProperties
              }
            >
              {progress} %
            </div>
          )}

          <RocketIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400" />
          <p className="text-indigo-600 dark:text-indigo-400 animate-pulse">
            {StatusText.UPLOADING}
          </p>
        </div>
      )}

      {/* Show Status Icons After Upload is Complete */}
      {showStatus && (
        <div className="mt-10 flex flex-col justify-center items-center gap-5">
          {
            // @ts-expect-error daily-ui bug
            statusIcons[status!]
          }
          <p className="text-indigo-600 dark:text-indigo-400 animate-pulse">
            {status !== null ? status.toString() : ""}
          </p>
        </div>
      )}

      {!isUploading && !showStatus && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-lg h-96 flex items-center justify-center ${
            isFocused || isDragAccept
              ? "bg-indigo-300 dark:bg-indigo-700"
              : "bg-indigo-100 dark:bg-gray-800"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center">
            {isDragActive ? (
              <>
                <RocketIcon className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className="h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 animate-bounce" />
                <p>Drag 'n' drop a document, or click to select</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUploader;
