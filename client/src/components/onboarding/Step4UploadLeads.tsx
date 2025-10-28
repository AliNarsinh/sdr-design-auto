import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, AlertCircle, Clock, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step4Data {
  uploadedFile: File | null;
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
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...data, uploadedFile: file });
      
      const mockLeads = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Lead ${i + 1}`,
        email: `lead${i + 1}@company.com`,
        company: `Company ${i + 1}`,
        status: Math.random() > 0.8 ? "error" : Math.random() > 0.5 ? "ready" : "researching",
      }));
      onChange({ ...data, uploadedFile: file, uploadedLeads: mockLeads });
    }
  };

  const downloadTemplate = () => {
    const csvContent = 
      "First Name,Last Name,Email,Company,Title,LinkedIn URL\n" +
      "Sarah,Johnson,sarah.johnson@acmecorp.com,Acme Corp,VP of Sales,https://linkedin.com/in/sarahjohnson\n" +
      "Michael,Chen,michael.chen@techstart.io,TechStart Inc,Head of Revenue,https://linkedin.com/in/michaelchen\n" +
      "Emily,Rodriguez,emily@growth.co,Growth Co,Director of Marketing,https://linkedin.com/in/emilyrodriguez";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
        <h3 className="font-semibold mb-4">Import Leads via CSV</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div>
              <p className="font-medium text-sm">Download CSV Template</p>
              <p className="text-xs text-muted-foreground">
                See the required format with example data
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="gap-2"
              data-testid="button-download-template"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>

          <label className="block">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium mb-1">Click to upload CSV</p>
              <p className="text-sm text-muted-foreground mb-3">
                or drag and drop your file here
              </p>
              <p className="text-xs text-muted-foreground">
                Required columns: First Name, Last Name, Email, Company
              </p>
              <p className="text-xs text-muted-foreground">
                Optional: Title, LinkedIn URL
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
              data-testid="input-csv-file"
            />
          </label>

          {data.uploadedFile && (
            <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{data.uploadedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(data.uploadedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            </div>
          )}
        </div>
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
