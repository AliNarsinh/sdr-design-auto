import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Linkedin, 
  Building2, 
  Briefcase,
  CheckCircle,
  Clock,
  Copy,
  Send
} from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";

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
  linkedin: string;
  lastActivity: string;
  nextAction: string;
  companyInfo: string;
  signals: string[];
}

const mockLeads: Record<string, Lead> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    company: "Acme Corp",
    title: "VP Sales",
    status: "engaged",
    priority: 95,
    progress: 75,
    email: "sarah.johnson@acme.corp",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    lastActivity: "Replied to email",
    nextAction: "Schedule demo call",
    companyInfo: "Acme Corp is a fast-growing B2B SaaS company that recently raised a $25M Series B led by Sequoia Capital. The company provides project management tools for distributed teams and is expanding rapidly into European markets.",
    signals: ["Series B funding ($25M)", "Hiring 15+ roles", "Expanding to Europe"],
  },
  "2": {
    id: "2",
    name: "Emily Rodriguez",
    company: "DataFlow Systems",
    title: "CTO",
    status: "meeting-scheduled",
    priority: 92,
    progress: 85,
    email: "emily@dataflow.com",
    phone: "+1 (555) 345-6789",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    lastActivity: "Meeting confirmed",
    nextAction: "Prepare demo materials",
    companyInfo: "DataFlow is a rapidly scaling data infrastructure company. Recently raised $50M Series C and is aggressively hiring across all departments.",
    signals: ["Series C funding ($50M)", "Hiring 25+ roles", "12 website visits"],
  },
};

const statusConfig = {
  new: { label: "New", color: "bg-blue-500" },
  contacted: { label: "Contacted", color: "bg-yellow-500" },
  engaged: { label: "Engaged", color: "bg-purple-500" },
  "meeting-scheduled": { label: "Meeting Scheduled", color: "bg-green-500" },
  converted: { label: "Converted", color: "bg-emerald-600" },
  paused: { label: "Paused", color: "bg-gray-400" },
};

export default function LeadDetail() {
  const [, params] = useRoute("/leads/:id");
  const [, setLocation] = useLocation();
  const leadId = params?.id || "1";
  const lead = mockLeads[leadId] || mockLeads["1"];
  
  const [emailDraft, setEmailDraft] = useState(
    `Hi ${lead.name.split(" ")[0]},\n\nI noticed ${lead.company} recently ${lead.signals[0]?.toLowerCase() || "made significant progress"} - congratulations on this milestone!\n\nWith your team growing and expanding into new markets, I imagine managing sales outreach at scale is becoming increasingly complex. At SDR Copilot, we help ${lead.title}s like yourself streamline personalized outreach and increase meeting conversion rates by 3x through AI-powered automation.\n\nI'd love to show you how companies like ${lead.company} are using our platform to:\n• Automate personalized email sequences\n• Prioritize high-intent leads automatically\n• Increase pipeline by 40%+ in the first quarter\n\nWould you be open to a quick 15-minute call next week to discuss how we can support ${lead.company}'s growth?\n\nBest regards,\nYour SDR Team\n\nP.S. I've attached a case study showing how a similar SaaS company increased their pipeline by 40% in Q1.`
  );

  const [linkedinMessage, setLinkedinMessage] = useState(
    `Hi ${lead.name.split(" ")[0]},\n\nI came across your profile and was impressed by ${lead.company}'s recent ${lead.signals[0]?.toLowerCase() || "growth"}. As a ${lead.title}, you're probably focused on scaling outreach efficiently.\n\nI work with revenue leaders to automate personalized outreach using AI. Would love to connect and share some insights that might be valuable for ${lead.company}.\n\nLooking forward to connecting!`
  );

  const [callScript, setCallScript] = useState(
    `**Opening (15 seconds)**\nHi ${lead.name.split(" ")[0]}, this is [Your Name] from SDR Copilot. Is now still a good time for our quick call?\n\n**Context Setting (30 seconds)**\nI know you're busy, so I'll keep this brief. I noticed ${lead.company} ${lead.signals[0]?.toLowerCase() || "has been growing rapidly"}, and you're likely focused on scaling your sales operations efficiently.\n\n**Value Proposition (45 seconds)**\nWe help ${lead.title}s like yourself automate personalized outreach while maintaining quality. Our clients typically see:\n• 3x increase in meeting conversion rates\n• 40% pipeline growth in the first quarter\n• 10+ hours saved per SDR per week\n\n**Discovery Questions**\n1. How is your team currently managing outbound outreach?\n2. What's your biggest challenge when it comes to personalizing at scale?\n3. How are you currently prioritizing which leads to contact first?\n\n**Transition to Demo**\nBased on what you've shared, I think a quick 15-minute demo would be valuable. I can show you exactly how [specific pain point] can be addressed. Would [Day/Time] or [Day/Time] work better for you?\n\n**Objection Handling**\n- "We're using [competitor]" → "That's great! Many of our clients started with [competitor]. What they found was... How's that working for you in terms of [pain point]?"\n- "Not interested" → "I understand. Can I ask - is it the timing, or is scaling personalized outreach not a priority right now?"\n- "Send me info" → "Happy to! To make sure I send the most relevant info, can I ask one quick question about [discovery question]?"\n\n**Closing**\nGreat talking with you, ${lead.name.split(" ")[0]}. I'll send over a calendar invite for [agreed time] and include a brief agenda. Looking forward to showing you how we can help ${lead.company} scale outreach efficiently!`
  );

  const statusInfo = statusConfig[lead.status];

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/leads")}
            data-testid="button-back-to-leads"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight">{lead.name}</h1>
            <p className="text-muted-foreground">
              {lead.title} at {lead.company}
            </p>
          </div>
          <Badge 
            className={`${statusInfo.color} text-white border-0`}
            data-testid="lead-status"
          >
            {statusInfo.label}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Priority Score</div>
                <div className="text-4xl font-semibold" data-testid="lead-priority">
                  {lead.priority}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold" data-testid="lead-progress">
                    {lead.progress}%
                  </span>
                </div>
                <Progress value={lead.progress} className="h-2" />
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${lead.email}`} 
                    className="text-primary hover:underline"
                    data-testid="lead-email"
                  >
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`tel:${lead.phone}`}
                    className="text-primary hover:underline"
                    data-testid="lead-phone"
                  >
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-testid="lead-linkedin"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 col-span-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Company Overview</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lead.companyInfo}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Key Signals</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lead.signals.map((signal, index) => (
                    <Badge key={index} variant="secondary">
                      {signal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Last Activity</span>
                  </div>
                  <p className="font-medium">{lead.lastActivity}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">Next Action</span>
                  </div>
                  <p className="font-medium">{lead.nextAction}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Next Action Steps</h2>
          
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="gap-2" data-testid="tab-email">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="gap-2" data-testid="tab-linkedin">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </TabsTrigger>
              <TabsTrigger value="call" className="gap-2" data-testid="tab-call">
                <Phone className="h-4 w-4" />
                Call Script
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Email Draft</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(emailDraft)}
                    className="gap-2"
                    data-testid="button-copy-email"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2"
                    data-testid="button-send-email"
                  >
                    <Send className="h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </div>
              <Textarea
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                data-testid="textarea-email-draft"
              />
            </TabsContent>

            <TabsContent value="linkedin" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">LinkedIn Connection Message</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(linkedinMessage)}
                    className="gap-2"
                    data-testid="button-copy-linkedin"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2"
                    data-testid="button-send-linkedin"
                  >
                    <Linkedin className="h-4 w-4" />
                    Open LinkedIn
                  </Button>
                </div>
              </div>
              <Textarea
                value={linkedinMessage}
                onChange={(e) => setLinkedinMessage(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                data-testid="textarea-linkedin-message"
              />
              <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Note:</strong> LinkedIn limits connection requests to 300 characters. 
                  Consider sending a connection request first, then following up with a longer message once connected.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="call" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Call Script</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(callScript)}
                    className="gap-2"
                    data-testid="button-copy-script"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2"
                    data-testid="button-start-call"
                  >
                    <Phone className="h-4 w-4" />
                    Start Call
                  </Button>
                </div>
              </div>
              <Textarea
                value={callScript}
                onChange={(e) => setCallScript(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                data-testid="textarea-call-script"
              />
              <Card className="p-4 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-900">
                <p className="text-sm text-purple-900 dark:text-purple-100">
                  <strong>Tip:</strong> This script is personalized based on {lead.company}'s signals and recent activity. 
                  Adapt as needed during the conversation to maintain authenticity.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
