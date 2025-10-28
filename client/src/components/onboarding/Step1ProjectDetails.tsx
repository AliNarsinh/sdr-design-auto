import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1Data {
  projectName: string;
  companyDescription: string;
  valueProposition: string[];
  geographies: string[];
  personas: string[];
  approveBeforeSend: boolean;
  linkedinManual: boolean;
}

interface Step1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
}

const geoOptions = ["North America", "Europe", "APAC", "Latin America", "Middle East", "Africa"];
const personaOptions = ["VP Sales", "Head of RevOps", "CTO", "VP Marketing", "Head of Operations", "CEO"];

export function Step1ProjectDetails({ data, onChange }: Step1Props) {
  const [newValue, setNewValue] = useState("");

  const toggleGeo = (geo: string) => {
    const newGeos = data.geographies.includes(geo)
      ? data.geographies.filter((g) => g !== geo)
      : [...data.geographies, geo];
    onChange({ ...data, geographies: newGeos });
  };

  const togglePersona = (persona: string) => {
    const newPersonas = data.personas.includes(persona)
      ? data.personas.filter((p) => p !== persona)
      : [...data.personas, persona];
    onChange({ ...data, personas: newPersonas });
  };

  const addValue = () => {
    if (newValue.trim()) {
      onChange({ ...data, valueProposition: [...data.valueProposition, newValue.trim()] });
      setNewValue("");
    }
  };

  const removeValue = (value: string) => {
    onChange({ ...data, valueProposition: data.valueProposition.filter((v) => v !== value) });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-name">
            Project Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="project-name"
            placeholder="e.g., Q1 2024 Outbound Campaign"
            value={data.projectName}
            onChange={(e) => onChange({ ...data, projectName: e.target.value })}
            data-testid="input-project-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-desc">
            What does your company do? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="company-desc"
            placeholder="Describe your company's core offering in 2-4 sentences..."
            value={data.companyDescription}
            onChange={(e) => onChange({ ...data, companyDescription: e.target.value })}
            className="min-h-[100px]"
            data-testid="textarea-company-description"
          />
          <p className="text-xs text-muted-foreground">
            This will be used to personalize outreach messages
          </p>
        </div>

        <div className="space-y-2">
          <Label>Primary Value Proposition / Outcomes</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add value proposition..."
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addValue();
                }
              }}
              data-testid="input-value-prop"
            />
          </div>
          {data.valueProposition.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.valueProposition.map((value, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeValue(value)}
                  data-testid={`badge-value-${index}`}
                >
                  {value} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Primary Geography</Label>
          <div className="flex flex-wrap gap-2">
            {geoOptions.map((geo) => (
              <Badge
                key={geo}
                variant={data.geographies.includes(geo) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleGeo(geo)}
                data-testid={`badge-geo-${geo}`}
              >
                {geo}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Target Personas</Label>
          <div className="flex flex-wrap gap-2">
            {personaOptions.map((persona) => (
              <Badge
                key={persona}
                variant={data.personas.includes(persona) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => togglePersona(persona)}
                data-testid={`badge-persona-${persona}`}
              >
                {persona}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Compliance Preferences</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.approveBeforeSend}
                onChange={(e) => onChange({ ...data, approveBeforeSend: e.target.checked })}
                className="h-4 w-4"
                data-testid="checkbox-approve-first"
              />
              <span className="text-sm">Approve all messages before first send</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.linkedinManual}
                onChange={(e) => onChange({ ...data, linkedinManual: e.target.checked })}
                className="h-4 w-4"
                data-testid="checkbox-linkedin-manual"
              />
              <span className="text-sm">LinkedIn messages require manual approval</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <Card className="p-6 bg-accent/30">
          <h3 className="font-semibold mb-3">Preview: How You'll Appear</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Company Introduction</p>
              <p className="leading-relaxed">
                {data.companyDescription || "Your company description will appear here..."}
              </p>
            </div>
            {data.valueProposition.length > 0 && (
              <div>
                <p className="text-muted-foreground text-xs mb-1">Key Benefits</p>
                <ul className="list-disc list-inside space-y-1">
                  {data.valueProposition.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.geographies.length > 0 && (
              <div>
                <p className="text-muted-foreground text-xs mb-1">Markets</p>
                <p>{data.geographies.join(", ")}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
