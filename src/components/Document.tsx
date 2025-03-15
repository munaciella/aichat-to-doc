// 'use client'

// import { useRouter } from "next/navigation";
// import byteSize from "byte-size";

// const Document = ({
//     id,
//     name,
//     size,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     downloadUrl,
// } : {
//     id: string;
//     name: string;
//     size: number;
//     downloadUrl: string;
// }) => {
//     const router = useRouter();

//   return (
//     <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white cursor-pointer group">
//         <div
//         className="flex-1"
//         onClick={() => {
//             router.push(`/dashboard/files/${id}`)
//         }}>
//             <p className="font-semibold line-clamp-2">{id}{ ' ' }{name}</p>
//             <p className="text-sm text-gray-500 group-hover:text-indigo-100">{byteSize(size).value} KB</p>
//         </div>
//     </div>
//   )
// }

// export default Document

"use client";

import { useRouter } from "next/navigation";
import byteSize from "byte-size";

const Document = ({
  id,
  name,
  size,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  downloadUrl,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col w-36 h-48 lg:w-62 lg:h-72 rounded-xl bg-gray-200 dark:bg-gray-900 shadow-lg justify-between lg:justify-start p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white cursor-pointer group"
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
    </div>
  );
};

export default Document;
