import { TournamentPage } from "@/components/tournaments/tournament-page";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Tournaments | Medical Exam UCAT",
  description: "Participate in exciting quiz tournaments and win amazing prizes.",
};

export default function Tournaments() {
  return <TournamentPage />;
}
