import { BattlePage } from "@/components/battle/battle-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Battle | Medical Exam UCAT",
  description: "Challenge friends or random players to real-time quiz battles",
};

export default function Battle() {
  return <BattlePage />;
}
