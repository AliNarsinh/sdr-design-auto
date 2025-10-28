import { LeadListItem } from "@/components/LeadListItem";
import { LeadDetailPanel } from "@/components/LeadDetailPanel";
import { TaskCard } from "@/components/TaskCard";
import { ChatTimeline } from "@/components/ChatTimeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

const mockLeads = [
  {
    id: "1",
    company: "Acme Corp",
    contact: "Sarah Johnson",
    title: "VP Sales",
    email: "sarah.johnson@acme.corp",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    icpScore: 85,
    intentScore: 72,
    stage: "To-Do",
    nextAction: "Approve email",
    due: "Today 2:00 PM",
    signals: [
      { type: "funding", label: "Series B" },
      { type: "hiring", label: "15 roles" },
    ],
    brief: "Acme Corp is a fast-growing B2B SaaS company that recently raised a $25M Series B led by Sequoia Capital (announced March 15, 2024). The company provides project management tools for distributed teams and is expanding rapidly into European markets.",
    notes: "Initial call went well - Sarah mentioned they're currently using Salesforce but struggling with personalization at scale.",
  },
  {
    id: "2",
    company: "TechStart Inc",
    contact: "Michael Chen",
    title: "Head of Ops",
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    linkedin: "https://linkedin.com/in/michaelchen",
    icpScore: 65,
    intentScore: 45,
    stage: "In Sequence",
    nextAction: "Follow-up email",
    due: "Tomorrow",
    signals: [{ type: "site_visit", label: "5 visits" }],
    brief: "TechStart is a mid-stage startup building developer tools. They've been visiting our pricing page repeatedly, indicating buying intent.",
    notes: "Sent initial email 3 days ago. No response yet.",
  },
  {
    id: "3",
    company: "DataFlow Systems",
    contact: "Emily Rodriguez",
    title: "CTO",
    email: "emily@dataflow.com",
    phone: "+1 (555) 345-6789",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    icpScore: 92,
    intentScore: 88,
    stage: "To-Do",
    nextAction: "LinkedIn connect",
    due: "Today 4:30 PM",
    signals: [
      { type: "funding", label: "Series C" },
      { type: "hiring", label: "25 roles" },
      { type: "site_visit", label: "12 visits" },
    ],
    brief: "DataFlow is a rapidly scaling data infrastructure company. Recently raised $50M Series C and is aggressively hiring across all departments.",
    notes: "",
  },
];

const chatMessages = [
  {
    id: "1",
    author: "sdr" as const,
    text: "Initial email sent with Series B congratulations hook",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    author: "system" as const,
    text: "Email opened by recipient",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    author: "customer" as const,
    text: "Thanks for reaching out. Interesting timing - we're actually evaluating sales tools right now. Can you send over some pricing info?",
    timestamp: "18 hours ago",
  },
  {
    id: "4",
    author: "ai" as const,
    text: "Suggested next step: Send pricing deck and propose demo for next week. High intent detected - prioritize this lead.",
    timestamp: "18 hours ago",
  },
];

export default function Leads() {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const selectedLead = mockLeads.find((lead) => lead.id === selectedLeadId);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-96 border-r flex flex-col">
        <div className="p-4 border-b space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-leads"
            />
          </div>

          <div className="flex gap-2">
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="flex-1" data-testid="select-stage-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="todo">To-Do</SelectItem>
                <SelectItem value="in-sequence">In Sequence</SelectItem>
                <SelectItem value="follow-up">Needs Follow-Up</SelectItem>
                <SelectItem value="booked">Meeting Booked</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || stageFilter !== "all") && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setStageFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {mockLeads.map((lead) => (
            <LeadListItem
              key={lead.id}
              {...lead}
              onClick={() => setSelectedLeadId(lead.id)}
              isActive={selectedLeadId === lead.id}
              testId={`lead-item-${lead.id}`}
            />
          ))}
        </div>

        <div className="p-4 border-t text-xs text-muted-foreground text-center">
          Showing 1-3 of 127 leads
        </div>
      </div>

      {selectedLead && (
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-1">
              <LeadDetailPanel
                company={selectedLead.company}
                contact={selectedLead.contact}
                title={selectedLead.title}
                email={selectedLead.email}
                phone={selectedLead.phone}
                linkedin={selectedLead.linkedin}
                icpScore={selectedLead.icpScore}
                signals={selectedLead.signals}
                companyBrief={selectedLead.brief}
                notes={selectedLead.notes}
                onUpdateNotes={(notes) => console.log("Notes updated:", notes)}
                testId="lead-detail"
              />
            </div>

            <div className="col-span-2 space-y-4">
              <TaskCard
                type="email"
                title="First Personalized Email"
                content={`Hi ${selectedLead.contact.split(" ")[0]},\n\nI noticed ${selectedLead.company} recently ${selectedLead.signals[0]?.label || "made headlines"} - congratulations! With your team expanding, I imagine managing sales operations across new markets is becoming increasingly complex.\n\nAt SDR Copilot, we help ${selectedLead.title}s like yourself streamline outreach and increase meeting conversion rates by 3x through AI-powered personalization.\n\nWould you be open to a quick 15-minute call next week to discuss how we can support ${selectedLead.company}'s growth?\n\nBest,\nJohn\n\nP.S. I've attached a case study showing how a similar SaaS company increased their pipeline by 40% in Q1.`}
                onApprove={() => console.log("Email approved")}
                onEdit={(content) => console.log("Email edited:", content)}
                onReject={() => console.log("Email rejected")}
                testId="task-email-1"
              />

              <TaskCard
                type="linkedin"
                title="LinkedIn Connection Request"
                content={`Hi ${selectedLead.contact.split(" ")[0]} - saw your company's recent ${selectedLead.signals[0]?.label || "growth"}. Impressive! I help ${selectedLead.title}s scale outreach efficiently. Would love to connect and share some insights.`}
                onComplete={() => console.log("LinkedIn task completed")}
                testId="task-linkedin-1"
              />

              <ChatTimeline
                messages={chatMessages}
                onAddMessage={(text) => console.log("Message added:", text)}
                testId="chat-timeline"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
