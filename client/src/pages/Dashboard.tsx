import { KPICard } from "@/components/KPICard";
import { TodoPanel } from "@/components/TodoPanel";
import { RoleToggle } from "@/components/RoleToggle";
import { useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState<"sdr" | "manager">("sdr");

  const todos = [
    {
      count: 8,
      description: "Emails to approve",
      href: "/leads?filter=pending-approval",
      testId: "todo-emails",
    },
    {
      count: 5,
      description: "LinkedIn tasks",
      href: "/leads?filter=linkedin",
      testId: "todo-linkedin",
    },
    {
      count: 3,
      description: "Calls to make",
      href: "/leads?filter=calls",
      testId: "todo-calls",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <RoleToggle
          role={role}
          onToggle={() => setRole(role === "sdr" ? "manager" : "sdr")}
          testId="role-toggle"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard
          label="Reply Rate"
          value="24%"
          change={5}
          testId="kpi-reply-rate"
        />
        <KPICard
          label="Meetings Booked"
          value="12"
          change={15}
          testId="kpi-meetings"
        />
        <KPICard
          label="Bounce Rate"
          value="2.3%"
          change={-1.2}
          testId="kpi-bounce"
        />
        <KPICard
          label="Active Sequences"
          value="3"
          testId="kpi-sequences"
        />
        <KPICard
          label="Open Tasks Today"
          value="18"
          testId="kpi-tasks"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TodoPanel items={todos} />
        </div>

        {role === "manager" && (
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Team Performance (Last 30 Days)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Team Reply Rate
                  </p>
                  <p className="text-2xl font-semibold">28%</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    +3% vs last month
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Total Meetings
                  </p>
                  <p className="text-2xl font-semibold">47</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    +12 vs last month
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Top Performing Sequence
                  </p>
                  <p className="text-sm font-semibold">High-Intent Outreach</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    32% reply rate
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Active SDRs
                  </p>
                  <p className="text-2xl font-semibold">5</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All performing above target
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
