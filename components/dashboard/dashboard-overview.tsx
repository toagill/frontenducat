import { RecentQuizzes } from "@/components/dashboard/recent-quizzes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Eye, Star, TrendingUp, Trophy, Users } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72.4%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exams Completed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+118 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Score Overview</CardTitle>
            <CardDescription>Your performance for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentQuizzes />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest exam sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-3">
                <p className="text-sm font-medium">Exam Completed</p>
                <p className="text-xs text-muted-foreground">Verbal Reasoning Mock — 68%</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-sm font-medium">Personal Best</p>
                <p className="text-xs text-muted-foreground">Decision Making — 81%</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium">Streak Achieved</p>
                <p className="text-xs text-muted-foreground">4-day practice streak</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-3">
                <p className="text-sm font-medium">Section Unlocked</p>
                <p className="text-xs text-muted-foreground">Abstract Reasoning advanced pack</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Subtest Breakdown</CardTitle>
            <CardDescription>Your performance by UCAT section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Verbal Reasoning</span>
                </div>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Decision Making</span>
                </div>
                <span className="font-medium">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Quantitative Reasoning</span>
                </div>
                <span className="font-medium">81%</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Full Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam Performance</CardTitle>
            <CardDescription>How your practice is trending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Questions</span>
                </div>
                <span className="font-medium">2,845</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Avg. Time per Question</span>
                </div>
                <span className="font-medium">1m 12s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Best Section</span>
                </div>
                <span className="font-medium">Quantitative</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Goals</CardTitle>
            <CardDescription>Track your weekly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-3">
                <p className="text-sm font-medium">Weekly Target</p>
                <p className="text-xs text-muted-foreground">5 practice sessions — 3 done</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-sm font-medium">Score Target</p>
                <p className="text-xs text-muted-foreground">Aim for 75% average this week</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium">Focus Area</p>
                <p className="text-xs text-muted-foreground">Verbal Reasoning needs improvement</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-3">
                <p className="text-sm font-medium">Next Mock Exam</p>
                <p className="text-xs text-muted-foreground">Full UCAT simulation scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

