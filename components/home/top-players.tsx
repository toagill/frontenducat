"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
type Player = {
  id: number;
  username: string;
  avatar: string;
  
  quizzes: number;
  badge: string;
  score?: number;
};
type TopPlayers = {
  
  score: Player[];
};
// Sample top players data
const topPlayers: TopPlayers = {
  
  score: [
    {
      id: 6,
      username: "MindMaster",
      avatar: "/avatars/mind.webp",
      score: 9850,
      quizzes: 47,
      badge: "diamond",
    },
    {
      id: 7,
      username: "QuizGenius",
      avatar: "/avatars/genious.png",
      score: 8720,
      quizzes: 42,
      badge: "platinum",
    },
    {
      id: 8,
      username: "BrainPower",
      avatar: "/avatars/brain.png",
      score: 7640,
      quizzes: 38,
      badge: "gold",
    },
    {
      id: 9,
      username: "KnowledgeGuru",
      avatar: "/avatars/guru.png",
      score: 6980,
      quizzes: 35,
      badge: "gold",
    },
    {
      id: 10,
      username: "QuizMaster",
      avatar: "/avatars/master.png",
      score: 6540,
      quizzes: 32,
      badge: "silver",
    },
  ],
};

export function TopPlayers() {
  const leaderboardType = "score";

  // Get badge color based on badge type
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "diamond":
        return "bg-gradient-to-r from-blue-400 to-purple-500";
      case "platinum":
        return "bg-gradient-to-r from-slate-300 to-slate-400";
      case "gold":
        return "bg-gradient-to-r from-amber-300 to-yellow-500";
      case "silver":
        return "bg-gradient-to-r from-slate-200 to-slate-300";
      default:
        return "bg-gradient-to-r from-stone-300 to-stone-400";
    }
  };

  // Get players based on selected leaderboard type
  const players = topPlayers.score;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-bold tracking-tight">Top Players</h2>
          </div>
          <p className="text-muted-foreground">This week's highest performers</p>
        </div>

        
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {players.map((player: Player, index) => (
              <div key={player.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-semibold">{index + 1}</div>
                  <Avatar className="h-10 w-10 border-2" style={{ borderColor: `var(--${player.badge}-color, #e2e8f0)` }}>
                    <AvatarImage src={player.avatar || `/placeholder.svg?height=40&width=40&query=avatar ${player.username}`} alt={player.username} />
                    <AvatarFallback className={getBadgeColor(player.badge)}>{player.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{player.username}</span>
                      <Badge variant="outline" className="capitalize text-xs">
                        {player.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{player.quizzes} quizzes completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{<span>{player?.score?.toLocaleString()} pts</span>}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/leaderboard" className="flex items-center justify-center gap-1">
                  View Full Leaderboard
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
