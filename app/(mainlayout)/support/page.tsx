import { SupportPage } from "@/components/support/support-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Medical Exam UCAT",
  description: "Get help and support for your Medical Exam UCAT  account",
};

export default function Support() {
  return <SupportPage />;
}
