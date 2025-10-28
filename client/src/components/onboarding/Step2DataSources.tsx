import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Upload, FileText } from "lucide-react";
import { useState } from "react";

interface Step2Data {
  primaryWebsite: string;
  keyUrls: { label: string; url: string }[];
  uploadedDocuments: File[];
}

interface Step2Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
}

const urlTemplates = ["About", "Product", "Pricing", "Blog", "Careers", "Press/News", "Docs"];

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange({
      ...data,
      uploadedDocuments: [...data.uploadedDocuments, ...files],
    });
  };

  const removeDocument = (index: number) => {
    onChange({
      ...data,
      uploadedDocuments: data.uploadedDocuments.filter((_, i) => i !== index),
    });
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
        <h3 className="font-semibold mb-4">
          Upload Documents <span className="text-destructive">*</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload product docs, case studies, pitch decks, or other materials that explain your offering
        </p>

        <div className="space-y-4">
          <label className="block">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium mb-1">Click to upload documents</p>
              <p className="text-sm text-muted-foreground mb-3">
                or drag and drop files here
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOCX, TXT, MD
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.md"
              className="hidden"
              onChange={handleFileUpload}
              data-testid="input-document-upload"
            />
          </label>

          {data.uploadedDocuments.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Documents ({data.uploadedDocuments.length})</Label>
              {data.uploadedDocuments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeDocument(index)}
                    data-testid={`button-remove-doc-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
