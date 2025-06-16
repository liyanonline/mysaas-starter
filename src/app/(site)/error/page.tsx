'use client';

import { SessionProvider } from "next-auth/react";

import Breadcrumb from "@/components/Common/Breadcrumb";
import NotFound from "@/components/NotFound";

// // Error:   x You are attempting to export "metadata" from a component marked with "use client", which is disallowed. 
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "404 Page | Play SaaS Starter Kit and Boilerplate for Next.js",
// };

const ErrorPage = () => {
  return (
    <>
      <Breadcrumb pageName="404 Page" />

      <NotFound />
    </>
  );
};

export default ErrorPage;
