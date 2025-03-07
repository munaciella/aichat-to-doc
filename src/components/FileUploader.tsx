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
import { useRouter } from "next/navigation";

const FileUploader = () => {
  const { progress, status, fileId, handleUpload } = useUpload();
  const router = useRouter();

  const [refreshTrigger, setRefreshTrigger] = useState(0); // 🔥 Force re-render on progress updates

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1); // 🔥 Trigger a re-render when progress changes
  }, [progress]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        await handleUpload(file);
      } else {
        // toast.error("Please upload a PDF file");
      }
    },
    [handleUpload]
  );

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: (
      <RocketIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.GENERATING]: (
      <HammerIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
    ),
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  //const uploadInProgress = progress !== null && progress >= 0 && progress <= 100;

  const isUploading = status === StatusText.UPLOADING;
  const showStatus = status !== StatusText.UPLOADING && status !== null;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {isUploading && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          {/* <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 ? "hidden" : ""
            }`}
            role="progressbar"
            style={
              {
                "--value": progress || 0,
                "--size": "12rem",
                "--thickness": "1.3rem",
              } as React.CSSProperties
            } // ✅ Fix: Ensure React recognizes CSS properties
          >
            {progress} %
          </div> */}

          {/* <div
            key={refreshTrigger} // ✅ This forces a React re-render when progress changes
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 ? "hidden" : ""
            }`}
            role="progressbar"
            style={
              {
                "--value": progress ?? 0, // ✅ Ensure a valid number
                "--size": "12rem",
                "--thickness": "1.3rem",
              } as React.CSSProperties
            }
          >
            {progress} %
          </div>

          {
            // @ts-expect-error daily-ui bug
            statusIcons[status!]
          }

          <p className="text-indigo-600 animate-pulse">
            {status !== null ? status.toString() : ""}
          </p>
        </div>
      )} */}

          {progress !== null && (
            <div
              key={refreshTrigger} // 🔥 Force re-render when progress updates
              className="radial-progress bg-indigo-300 text-white border-indigo-600 border-4"
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

          <RocketIcon className="h-20 w-20 text-indigo-600" />
          <p className="text-indigo-600 animate-pulse">
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
          <p className="text-indigo-600 animate-pulse">
            {status !== null ? status.toString() : ""}
          </p>
        </div>
      )}

      {!isUploading && !showStatus && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center justify-center ${
            isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center">
            {isDragActive ? (
              <>
                <RocketIcon className="w-20 h-20 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className="w-20 h-20 animate-bounce" />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUploader;
