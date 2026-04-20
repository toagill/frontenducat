import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Exam UCAT — UK Medical School Preparation",
  description: "The most effective UCAT preparation platform. 500+ practice questions, full timed mock exams, and detailed explanations for all 5 subtests.",
  keywords: "UCAT, medical school, UK, practice questions, mock exam, verbal reasoning, decision making",
  openGraph: {
    title: "Medical Exam UCAT",
    description: "Ace your UCAT with 500+ practice questions and full mock exams",
    url: "https://medicalexamucat.co.uk",
    siteName: "Medical Exam UCAT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
