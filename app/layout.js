import { Rubik } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner';

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "YelpCamp",
  description: "A website for tech people who love nature.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={rubik.className}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
