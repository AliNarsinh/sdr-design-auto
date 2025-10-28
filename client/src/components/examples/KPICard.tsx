import { KPICard } from "../KPICard";

export default function KPICardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 bg-background">
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
  );
}
