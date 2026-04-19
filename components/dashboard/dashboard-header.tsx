import { PlusCircle } from "lucide-react";

interface DashboardHeaderProps {
  activeTab: string;
}

export function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  const getHeaderContent = () => {
    switch (activeTab) {
      case "settings":
        return {
          title: "Dashboard Settings",
          description: "Customize your dashboard experience.",
        };
      default:
        return {
          title: "My Dashboard",
          description: "Track your UCAT progress, scores, and performance.",
        };
    }
  };

  const content = getHeaderContent();

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
    </div>
  );
}
