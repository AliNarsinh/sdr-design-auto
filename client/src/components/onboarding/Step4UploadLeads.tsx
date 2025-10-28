import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, AlertCircle, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step4Data {
  uploadMethod: "csv" | "paste";
  pastedData: string;
  assignedSequence: string;
  uploadedLeads: any[];
}

interface Step4Props {
  data: Step4Data;
  icps: any[];
  onChange: (data: Step4Data) => void;
}

const statusConfig = {
  importing: { icon: Clock, label: "Importing", color: "text-blue-500" },
  enriching: { icon: Clock, label: "Enriching", color: "text-yellow-500" },
  researching: { icon: Clock, label: "Researching", color: "text-purple-500" },
  ready: { icon: CheckCircle, label: "Ready to Push", color: "text-green-500" },
  error: { icon: AlertCircle, label: "Needs Fix", color: "text-red-500" },
};

export function Step4UploadLeads({ data, icps, onChange }: Step4Props) {
  const parseLeads = () => {
    const lines = data.pastedData.trim().split("\n");
    const leads = lines
      .filter((line) => line.trim())
      .map((line, index) => {
        const parts = line.split(",").map((p) => p.trim());
        return {
          id: index + 1,
          name: parts[0] || "",
          email: parts[1] || "",
          company: parts[2] || "",
          status: Math.random() > 0.8 ? "error" : Math.random() > 0.5 ? "ready" : "researching",
        };
      });
    onChange({ ...data, uploadedLeads: leads });
  };

  const stats = {
    total: data.uploadedLeads.length,
    ready: data.uploadedLeads.filter((l) => l.status === "ready").length,
    researching: data.uploadedLeads.filter((l) => l.status === "researching").length,
    error: data.uploadedLeads.filter((l) => l.status === "error").length,
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Import Leads</h3>
        
        <div className="flex gap-2 mb-4">
          <Button
            variant={data.uploadMethod === "csv" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange({ ...data, uploadMethod: "csv" })}
            data-testid="button-method-csv"
          >
            Upload CSV
          </Button>
          <Button
            variant={data.uploadMethod === "paste" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange({ ...data, uploadMethod: "paste" })}
            data-testid="button-method-paste"
          >
            Paste Data
          </Button>
        </div>

        {data.uploadMethod === "csv" ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium mb-1">Click to upload CSV</p>
            <p className="text-sm text-muted-foreground mb-3">
              or drag and drop your file here
            </p>
            <p className="text-xs text-muted-foreground">
              Format: Name, Email, Company, Title (optional)
            </p>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              data-testid="input-csv-file"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="Paste contacts (format: Name, Email, Company)&#10;Example:&#10;Sarah Johnson, sarah@acme.com, Acme Corp&#10;Michael Chen, m.chen@techstart.io, TechStart Inc"
              value={data.pastedData}
              onChange={(e) => onChange({ ...data, pastedData: e.target.value })}
              className="min-h-[150px] font-mono text-xs"
              data-testid="textarea-paste-leads"
            />
            <Button onClick={parseLeads} size="sm" data-testid="button-parse-leads">
              Parse & Preview
            </Button>
          </div>
        )}
      </Card>

      {icps.length > 0 && (
        <Card className="p-6">
          <div className="space-y-3">
            <Label>Assign to ICP (Optional)</Label>
            <Select>
              <SelectTrigger data-testid="select-assign-icp">
                <SelectValue placeholder="Select ICP profile..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect based on company data</SelectItem>
                {icps.map((icp) => (
                  <SelectItem key={icp.id} value={icp.id}>
                    {icp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Assign to Sequence (Optional)</Label>
            <Select
              value={data.assignedSequence}
              onValueChange={(value) => onChange({ ...data, assignedSequence: value })}
            >
              <SelectTrigger data-testid="select-assign-sequence">
                <SelectValue placeholder="Select sequence..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No sequence (manual outreach)</SelectItem>
                <SelectItem value="high-intent">High-Intent Outreach</SelectItem>
                <SelectItem value="hiring">Hiring Hook Sequence</SelectItem>
                <SelectItem value="funding">Funding Announcement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {data.uploadedLeads.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Preview & Status</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-semibold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Imported</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {stats.ready}
              </div>
              <div className="text-xs text-muted-foreground">Ready to Push</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                {stats.researching}
              </div>
              <div className="text-xs text-muted-foreground">Researching</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                {stats.error}
              </div>
              <div className="text-xs text-muted-foreground">Needs Fix</div>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-auto">
            {data.uploadedLeads.slice(0, 10).map((lead) => {
              const config = statusConfig[lead.status as keyof typeof statusConfig];
              const Icon = config.icon;
              
              return (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 border rounded-lg text-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium">{lead.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground">
                      {lead.email} • {lead.company || "No company"}
                    </div>
                  </div>
                  <Badge variant="outline" className={`gap-1 ${config.color}`}>
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          {data.uploadedLeads.length > 10 && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Showing 10 of {data.uploadedLeads.length} leads
            </p>
          )}
        </Card>
      )}

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>Note:</strong> After completing setup, leads will continue processing in the
          background. You'll be able to work on "Ready to Push" leads immediately while others
          are being researched.
        </p>
      </Card>
    </div>
  );
}
