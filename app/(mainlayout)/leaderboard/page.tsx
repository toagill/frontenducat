import { LeaderboardPage } from "@/components/leaderboard/leaderboard-page";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | Medical Exam UCAT",
  description: "See who's leading the pack in our global quiz rankings.",
};

export default function LeaderboardRoute() {
  return <LeaderboardPage />;
}
