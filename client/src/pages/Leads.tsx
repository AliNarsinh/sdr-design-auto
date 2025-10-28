import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  status: "new" | "contacted" | "engaged" | "meeting-scheduled" | "converted" | "paused";
  priority: number;
  progress: number;
  email: string;
  phone: string;
  lastActivity: string;
  nextAction: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "Acme Corp",
    title: "VP Sales",
    status: "engaged",
    priority: 95,
    progress: 75,
    email: "sarah.johnson@acme.corp",
    phone: "+1 (555) 123-4567",
    lastActivity: "Replied to email",
    nextAction: "Schedule demo call",
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    company: "DataFlow Systems",
    title: "CTO",
    status: "meeting-scheduled",
    priority: 92,
    progress: 85,
    email: "emily@dataflow.com",
    phone: "+1 (555) 345-6789",
    lastActivity: "Meeting confirmed",
    nextAction: "Prepare demo materials",
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "TechStart Inc",
    title: "Head of Ops",
    status: "contacted",
    priority: 78,
    progress: 45,
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    lastActivity: "Email opened",
    nextAction: "Send follow-up",
  },
  {
    id: "4",
    name: "David Kim",
    company: "CloudScale",
    title: "Director of Sales",
    status: "converted",
    priority: 100,
    progress: 100,
    email: "david.kim@cloudscale.io",
    phone: "+1 (555) 456-7890",
    lastActivity: "Demo completed",
    nextAction: "Follow up on proposal",
  },
  {
    id: "5",
    name: "Jennifer Martinez",
    company: "Growth Analytics",
    title: "VP Marketing",
    status: "engaged",
    priority: 85,
    progress: 60,
    email: "jen@growthanalytics.com",
    phone: "+1 (555) 567-8901",
    lastActivity: "Clicked pricing link",
    nextAction: "Send pricing info",
  },
  {
    id: "6",
    name: "Robert Taylor",
    company: "SalesTech Pro",
    title: "CEO",
    status: "new",
    priority: 88,
    progress: 15,
    email: "robert@salestechpro.com",
    phone: "+1 (555) 678-9012",
    lastActivity: "Lead imported",
    nextAction: "Send initial email",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    company: "RevOps Solutions",
    title: "Head of Revenue",
    status: "contacted",
    priority: 72,
    progress: 35,
    email: "lisa@revopssolutions.com",
    phone: "+1 (555) 789-0123",
    lastActivity: "Email sent 2 days ago",
    nextAction: "LinkedIn connection",
  },
  {
    id: "8",
    name: "James Wilson",
    company: "Enterprise SaaS Co",
    title: "VP of Sales Ops",
    status: "paused",
    priority: 65,
    progress: 25,
    email: "james@enterprisesaas.com",
    phone: "+1 (555) 890-1234",
    lastActivity: "Out of office auto-reply",
    nextAction: "Resume in 2 weeks",
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-blue-500" },
  contacted: { label: "Contacted", color: "bg-yellow-500" },
  engaged: { label: "Engaged", color: "bg-purple-500" },
  "meeting-scheduled": { label: "Meeting Scheduled", color: "bg-green-500" },
  converted: { label: "Converted", color: "bg-emerald-600" },
  paused: { label: "Paused", color: "bg-gray-400" },
};

export default function Leads() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"priority" | "progress">("priority");

  const filteredLeads = mockLeads
    .filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else {
        return b.progress - a.progress;
      }
    });

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Leads</h1>
            <p className="text-muted-foreground">
              Manage and prioritize your sales opportunities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === "priority" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("priority")}
              className="gap-1"
              data-testid="button-sort-priority"
            >
              <ArrowUpDown className="h-4 w-4" />
              Priority
            </Button>
            <Button
              variant={sortBy === "progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("progress")}
              className="gap-1"
              data-testid="button-sort-progress"
            >
              <ArrowUpDown className="h-4 w-4" />
              Progress
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, company, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-leads"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="meeting-scheduled">Meeting Scheduled</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || statusFilter !== "all") && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>

        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const statusInfo = statusConfig[lead.status];
            
            return (
              <Card
                key={lead.id}
                className="p-5 hover-elevate cursor-pointer transition-all"
                onClick={() => setLocation(`/leads/${lead.id}`)}
                data-testid={`lead-card-${lead.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate" data-testid={`lead-name-${lead.id}`}>
                          {lead.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {lead.title} at {lead.company}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Priority</div>
                          <div className="text-2xl font-semibold" data-testid={`lead-priority-${lead.id}`}>
                            {lead.priority}
                          </div>
                        </div>

                        <Badge 
                          className={`${statusInfo.color} text-white border-0`}
                          data-testid={`lead-status-${lead.id}`}
                        >
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress to Conversion</span>
                        <span className="font-semibold" data-testid={`lead-progress-${lead.id}`}>
                          {lead.progress}%
                        </span>
                      </div>
                      <Progress value={lead.progress} className="h-2" />
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                        <span>Last: {lead.lastActivity}</span>
                        <span>Next: {lead.nextAction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredLeads.length === 0 && (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <p className="text-lg mb-2">No leads found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </Card>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredLeads.length} of {mockLeads.length} leads
        </div>
      </div>
    </div>
  );
}
