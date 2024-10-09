export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    ...defaultConfig,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      // ignoreDuringBuilds: false,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      // ignoreBuildErrors: false,
    },
  };
  return nextConfig;
};

// import { NextConfig } from "next";
// import {
//   PHASE_TEST,
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_EXPORT,
//   PHASE_PRODUCTION_BUILD,
//   PHASE_PRODUCTION_SERVER,
//   PHASE_INFO,
// } from "next/constants";

// type Phase =
//   | typeof PHASE_EXPORT
//   | typeof PHASE_PRODUCTION_BUILD
//   | typeof PHASE_PRODUCTION_SERVER
//   | typeof PHASE_DEVELOPMENT_SERVER
//   | typeof PHASE_TEST
//   | typeof PHASE_INFO
//   | typeof PHASE_PRODUCTION_BUILD;

// export default (phase: Phase, { defaultConfig }: { defaultConfig: NextConfig }) => {
//   const nextConfig: NextConfig = {
//     ...defaultConfig,
//     eslint: {
//       // Warning: This allows production builds to successfully complete even if
//       // your project has ESLint errors.
//       ignoreDuringBuilds: false,
//     },
//     typescript: {
//       // !! WARN !!
//       // Dangerously allow production builds to successfully complete even if
//       // your project has type errors.
//       // !! WARN !!
//       ignoreBuildErrors: false,
//     },
//     experimental: {
//       typedRoutes: true,
//     },
//   };
//   return nextConfig;
// };
