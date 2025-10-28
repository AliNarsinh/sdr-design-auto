import { AlertItem } from "../AlertItem";

export default function AlertItemExample() {
  const alerts = [
    {
      company: "CloudScale Technologies",
      signalType: "funding" as const,
      reason: "Raised $25M Series B led by Sequoia Capital",
      detectedAt: "2 hours ago",
      recommendedAction: "Email with funding congratulations hook",
    },
    {
      company: "DataViz Pro",
      signalType: "hiring" as const,
      reason: "Posted 15 new sales positions in last week",
      detectedAt: "5 hours ago",
      recommendedAction: "LinkedIn message about scaling challenges",
    },
    {
      company: "FinTech Solutions Inc",
      signalType: "site_visit" as const,
      reason: "Visited pricing page 8 times in 3 days",
      detectedAt: "1 day ago",
      recommendedAction: "Direct call to discuss implementation",
    },
  ];

  return (
    <div className="bg-background max-w-4xl border rounded-lg overflow-hidden">
      {alerts.map((alert, index) => (
        <AlertItem
          key={index}
          {...alert}
          onClick={() => console.log(`Alert clicked: ${alert.company}`)}
          onImport={() => console.log(`Import clicked: ${alert.company}`)}
          testId={`alert-item-${index}`}
        />
      ))}
    </div>
  );
}
