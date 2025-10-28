import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Upload, Check } from "lucide-react";
import { useState } from "react";

interface Step2Data {
  primaryWebsite: string;
  keyUrls: { label: string; url: string }[];
  documentSources: { type: string; value: string }[];
  thirdPartySignals: string[];
}

interface Step2Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
}

const urlTemplates = ["About", "Product", "Pricing", "Blog", "Careers", "Press/News", "Docs"];
const signalOptions = ["Funding Database", "Jobs Feed", "Website Intent Tracking"];

export function Step2DataSources({ data, onChange }: Step2Props) {
  const [newUrlLabel, setNewUrlLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addUrl = () => {
    if (newUrlLabel.trim() && newUrl.trim()) {
      onChange({
        ...data,
        keyUrls: [...data.keyUrls, { label: newUrlLabel.trim(), url: newUrl.trim() }],
      });
      setNewUrlLabel("");
      setNewUrl("");
    }
  };

  const removeUrl = (index: number) => {
    onChange({
      ...data,
      keyUrls: data.keyUrls.filter((_, i) => i !== index),
    });
  };

  const toggleSignal = (signal: string) => {
    const newSignals = data.thirdPartySignals.includes(signal)
      ? data.thirdPartySignals.filter((s) => s !== signal)
      : [...data.thirdPartySignals, signal];
    onChange({ ...data, thirdPartySignals: newSignals });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Company Website</h3>
        <div className="space-y-2">
          <Label htmlFor="primary-website">
            Primary Website URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="primary-website"
            type="url"
            placeholder="https://yourcompany.com"
            value={data.primaryWebsite}
            onChange={(e) => onChange({ ...data, primaryWebsite: e.target.value })}
            data-testid="input-primary-website"
          />
          <p className="text-xs text-muted-foreground">
            We'll use this to gather context about your company
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Key URLs</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add important pages to help us understand your offering
        </p>

        <div className="space-y-3">
          {data.keyUrls.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge variant="outline" className="min-w-[100px] justify-center">
                {item.label}
              </Badge>
              <Input value={item.url} readOnly className="flex-1" />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeUrl(index)}
                data-testid={`button-remove-url-${index}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              placeholder="Label (e.g., Pricing)"
              value={newUrlLabel}
              onChange={(e) => setNewUrlLabel(e.target.value)}
              className="w-40"
              data-testid="input-url-label"
            />
            <Input
              placeholder="https://"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
              data-testid="input-url-value"
            />
            <Button
              size="icon"
              onClick={addUrl}
              disabled={!newUrlLabel.trim() || !newUrl.trim()}
              data-testid="button-add-url"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs text-muted-foreground">Quick add:</span>
            {urlTemplates.map((template) => (
              <Badge
                key={template}
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setNewUrlLabel(template);
                }}
              >
                {template}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Document Sources (Optional)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload or link to additional context documents
        </p>

        <div className="space-y-3">
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover-elevate cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Upload Folder</p>
            <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
          </div>

          <Input
            placeholder="Cloud Drive Link (Google Drive, Dropbox, etc.)"
            data-testid="input-cloud-drive"
          />

          <Input
            placeholder="Knowledge Base URL"
            data-testid="input-knowledge-base"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Third-Party Signals (Optional)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect external data sources for better targeting
        </p>

        <div className="space-y-2">
          {signalOptions.map((signal) => (
            <div
              key={signal}
              className="flex items-center justify-between p-3 border rounded-lg hover-elevate cursor-pointer"
              onClick={() => toggleSignal(signal)}
            >
              <span className="text-sm">{signal}</span>
              {data.thirdPartySignals.includes(signal) ? (
                <Badge variant="default" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline">Skipped</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
