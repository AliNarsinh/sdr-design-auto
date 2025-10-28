import { AlertItem } from "@/components/AlertItem";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockAlerts = [
  {
    id: "1",
    company: "CloudScale Technologies",
    signalType: "funding" as const,
    reason: "Raised $25M Series B led by Sequoia Capital",
    detectedAt: "2 hours ago",
    recommendedAction: "Email with funding congratulations hook",
    details: "CloudScale Technologies announced their Series B funding round today, bringing total funding to $40M. The company is expanding from 50 to 120 employees over the next quarter.",
    links: [
      { label: "TechCrunch Article", url: "https://techcrunch.com" },
      { label: "Company Blog", url: "https://cloudscale.com/blog" },
    ],
  },
  {
    id: "2",
    company: "DataViz Pro",
    signalType: "hiring" as const,
    reason: "Posted 15 new sales positions in last week",
    detectedAt: "5 hours ago",
    recommendedAction: "LinkedIn message about scaling challenges",
    details: "DataViz Pro is rapidly expanding their go-to-market team with 15 new sales roles posted across North America and Europe. This indicates strong growth trajectory and likely need for sales enablement tools.",
    links: [
      { label: "LinkedIn Jobs", url: "https://linkedin.com/jobs" },
    ],
  },
  {
    id: "3",
    company: "FinTech Solutions Inc",
    signalType: "site_visit" as const,
    reason: "Visited pricing page 8 times in 3 days",
    detectedAt: "1 day ago",
    recommendedAction: "Direct call to discuss implementation",
    details: "Multiple team members from FinTech Solutions have been reviewing our pricing and features pages, with extended time on ROI calculator. Strong buying intent detected.",
    links: [],
  },
  {
    id: "4",
    company: "SaaS Metrics Co",
    signalType: "funding" as const,
    reason: "Raised $15M Series A led by a16z",
    detectedAt: "1 day ago",
    recommendedAction: "Email with scaling operations hook",
    details: "SaaS Metrics Co closed their Series A to expand their analytics platform. They're hiring across engineering and sales teams.",
    links: [
      { label: "Press Release", url: "https://saasmetrics.com/press" },
    ],
  },
];

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [signalFilter, setSignalFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<typeof mockAlerts[0] | null>(null);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-6 border-b space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lead Alerts</h1>
          <p className="text-sm text-muted-foreground">
            ICP-fit opportunities based on signals
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-alerts"
            />
          </div>

          <Select value={signalFilter} onValueChange={setSignalFilter}>
            <SelectTrigger className="w-48" data-testid="select-signal-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Signal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Signals</SelectItem>
              <SelectItem value="funding">Funding</SelectItem>
              <SelectItem value="hiring">Hiring</SelectItem>
              <SelectItem value="site_visit">Site Visits</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {mockAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              company={alert.company}
              signalType={alert.signalType}
              reason={alert.reason}
              detectedAt={alert.detectedAt}
              recommendedAction={alert.recommendedAction}
              onClick={() => setSelectedAlert(alert)}
              onImport={() => console.log(`Import ${alert.company}`)}
              testId={`alert-${alert.id}`}
            />
          ))}
        </div>

        <div className="p-4 border-t text-xs text-muted-foreground text-center">
          Showing 4 of 23 alerts
        </div>
      </div>

      <Sheet open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <SheetContent className="w-[500px] sm:w-[540px]">
          {selectedAlert && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {selectedAlert.company}
                  <Badge
                    variant={
                      selectedAlert.signalType === "funding"
                        ? "default"
                        : selectedAlert.signalType === "hiring"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {selectedAlert.signalType === "funding"
                      ? "Funding"
                      : selectedAlert.signalType === "hiring"
                      ? "Hiring"
                      : "Site Visit"}
                  </Badge>
                </SheetTitle>
                <SheetDescription>{selectedAlert.reason}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Why this company is here</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAlert.details}
                  </p>
                </div>

                {selectedAlert.links.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Supporting Links</h3>
                    <div className="space-y-2">
                      {selectedAlert.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline block"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium mb-2">Suggested Opening</h3>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    Hi [Name], I saw that {selectedAlert.company}{" "}
                    {selectedAlert.reason.toLowerCase()}. Congratulations! As you scale,
                    I thought you might be interested in how we help companies like yours
                    streamline their sales outreach...
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      console.log(`Import ${selectedAlert.company}`);
                      setSelectedAlert(null);
                    }}
                    data-testid="button-import-alert"
                  >
                    Import to Your Leads
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedAlert(null)}
                    data-testid="button-close-alert"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
