"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";

//we need to configure CORS
//gsutil cors set cors.json gs://paperly-ee88f.appspot.com
//go here >>> https://console.cloud.google.com/
//create new file in editor calls cors.json
//run >>> // gsutil cors set cors.json gs://paperly-ee88f.appspot.com
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfView = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();

      setFile(file);
    };

    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="sticky top-0 z-50 bg-gray-300 dark:bg-gray-800 p-3 rounded-md shadow-md w-full max-w-6xl">
        <div className="grid grid-cols-6 gap-2">
          <Button
            variant="outline"
            disabled={pageNumber === 1}
            onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
            className="dark:border-gray-500 dark:text-gray-300 hover:dark:bg-gray-700 text-xs md:text-sm sm:text-sm lg:text-sm"
          >
            Previous
          </Button>
          <p className="flex items-center justify-center text-gray-900 dark:text-gray-300 font-medium">
            {pageNumber} of {numPages}
          </p>

          <Button
            variant="outline"
            disabled={pageNumber === numPages}
            onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
            className="dark:border-gray-500 dark:text-gray-300 hover:dark:bg-gray-700 text-xs md:text-sm sm:text-sm lg:text-sm"
          >
            Next
          </Button>

          <Button
            variant="outline"
            onClick={() => setRotation((rotation + 90) % 360)}
            className="dark:border-gray-500 dark:text-gray-300 hover:dark:bg-gray-700"
            aria-label="Rotate"
          >
            <RotateCw />
          </Button>

          <Button
            variant="outline"
            disabled={scale >= 1.5}
            onClick={() => setScale(scale * 1.2)}
            className="dark:border-gray-500 dark:text-gray-300 hover:dark:bg-gray-700"
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </Button>

          <Button
            variant="outline"
            disabled={scale <= 0.75}
            onClick={() => setScale(scale / 1.2)}
            className="dark:border-gray-500 dark:text-gray-300 hover:dark:bg-gray-700"
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </Button>
        </div>
      </div>

      {!file ? (
        <Loader2Icon className="animate-spin h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-500 mt-20" />
      ) : (
        <Document
          loading={null}
          file={file}
          rotate={rotation}
          onLoadSuccess={onDocumentLoadSuccess}
          className="m-4 overflow-scroll"
        >
          <Page className="shadow-lg dark:shadow-gray-700" scale={scale} pageNumber={pageNumber} renderTextLayer={false} />
        </Document>
      )}
    </div>
  );
};

export default PdfView;
