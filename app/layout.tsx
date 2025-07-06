import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

// function Header() {
//   // const { data: user } = useSWR<User>('/api/user', fetcher);
//   return (
//     <header className="border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <Link href="/" className="flex items-center">
//           <CircleIcon className="h-6 w-6 text-orange-500" />
//           <span className="ml-2 text-xl font-semibold text-gray-900">ACME</span>
//         </Link>

//         <Link href="/blog">Blog</Link>


//         {/*

//         <nav className="flex space-x-4">
//           <Link href="/blog">Blog</Link>
//           {user ? (
//             <>
//               <Link href="/dashboard">Dashboard</Link>
//               <form action="/api/auth/sign-out" method="POST">
//                 <Button variant="outline">Sign Out</Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Link href="/sign-in">
//                 <Button variant="outline">Sign In</Button>
//               </Link>
//               <Link href="/sign-up">
//                 <Button>Sign Up</Button>
//               </Link>
//             </>
//           )}
//         </nav> */}

//         <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
//           Features
//         </a>
//         <a className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
//           Testimonials
//         </a>
//         <a className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
//           Pricing
//         </a>

//         {/* <div className="flex items-center space-x-4">
//           <Suspense fallback={<div className="h-9" />}>
//             <UserMenu />
//           </Suspense>
//         </div> */}
//       </div>
//     </header>
//   );
// }

// function Footer() {
//   return (
//     <footer
//       className="footer md:footer-horizontal p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
//     >
//       <nav>
//         <span className="footer-title opacity-80">Explore</span>
//         <a className="link link-hover mb-1" href="/">Overview</a>
//         <a className="link link-hover my-1" href="/pricing">Pricing</a>
//         <a className="link link-hover my-1" href="/blog">Blog</a>
//         <a className="link link-hover my-1" href="/contact_us">Contact Us</a>
//         <a
//           className="link link-hover my-1"
//           href="https://github.com/CriticalMoments/CMSaasStarter">Github</a
//         >
//       </nav>
//       <aside>
//         <span className="footer-title opacity-80">Sponsor</span>
//         <a className="max-w-[260px]" href="https://getkiln.ai">
//           <div className="font-bold text-3xl mb-1">Kiln AI</div>
//           <div className="font-medium mb-3">Build High Quality AI Products</div>
//           <div className="font-light">
//             Use advanced AI tactics, and collaborate with your team. Free apps for
//             Mac and Windows.
//           </div>
//           <div className="link text-sm font-bold mt-2">Learn More</div>
//         </a>
//       </aside>
//     </footer>)
// }

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          <Header />
          {children}
          <Footer />

        </SWRConfig>
      </body>
    </html>
  );
}
