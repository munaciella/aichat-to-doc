/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: "tsconfig.jest.json",
      },
    ],
    "^.+\\.mjs$": "ts-jest", // needed for ESM packages
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // ✅ Mock static assets
    '\\.(jpg|jpeg|png|gif|webp|svg|avif)$': '<rootDir>/__mocks__/fileMock.js',

    // ✅ Mock Next.js Image
    '^next/image$': '<rootDir>/__mocks__/nextImageMock.js',

    // ✅ Mock CSS (required by react-pdf)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // ✅ Tell Jest to transform these normally even though they're in node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!(@clerk|uuid|react-pdf|pdfjs-dist|react-markdown)/)'
  ],  
};
