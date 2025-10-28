import { LeadListItem } from "../LeadListItem";
import { useState } from "react";

export default function LeadListItemExample() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const leads = [
    {
      id: "1",
      company: "Acme Corp",
      contact: "Sarah Johnson",
      title: "VP Sales",
      icpScore: 85,
      intentScore: 72,
      stage: "To-Do",
      nextAction: "Approve email",
      due: "Today 2:00 PM",
    },
    {
      id: "2",
      company: "TechStart Inc",
      contact: "Michael Chen",
      title: "Head of Ops",
      icpScore: 65,
      intentScore: 45,
      stage: "In Sequence",
      nextAction: "Follow-up email",
      due: "Tomorrow",
    },
    {
      id: "3",
      company: "DataFlow Systems",
      contact: "Emily Rodriguez",
      title: "CTO",
      icpScore: 92,
      intentScore: 88,
      stage: "To-Do",
      nextAction: "LinkedIn connect",
      due: "Today 4:30 PM",
    },
  ];

  return (
    <div className="bg-background max-w-4xl border rounded-lg overflow-hidden">
      {leads.map((lead) => (
        <LeadListItem
          key={lead.id}
          {...lead}
          onClick={() => {
            console.log(`Lead ${lead.id} clicked`);
            setActiveId(lead.id);
          }}
          isActive={activeId === lead.id}
          testId={`lead-item-${lead.id}`}
        />
      ))}
    </div>
  );
}
