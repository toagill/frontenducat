"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { SettingsDashboard } from "@/components/dashboard/settings-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function DashboardPage() {
  const tab = useSearchParams().get("tab");
  const [activeTab, setActiveTab] = useState(tab || "overview");

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader activeTab={activeTab} />

      <Tabs defaultValue={activeTab} className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="flex gap-4 md:grid md:grid-cols-2 w-full max-w-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
