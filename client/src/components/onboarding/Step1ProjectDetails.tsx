import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, X } from "lucide-react";

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

export function Step1ProjectDetails({ data, onChange }: Step1Props) {
  const [newValue, setNewValue] = useState("");
  const [newGeo, setNewGeo] = useState("");
  const [newPersona, setNewPersona] = useState("");

  const addValue = () => {
    if (newValue.trim()) {
      onChange({ ...data, valueProposition: [...data.valueProposition, newValue.trim()] });
      setNewValue("");
    }
  };

  const removeValue = (value: string) => {
    onChange({ ...data, valueProposition: data.valueProposition.filter((v) => v !== value) });
  };

  const addGeo = () => {
    if (newGeo.trim() && !data.geographies.includes(newGeo.trim())) {
      onChange({ ...data, geographies: [...data.geographies, newGeo.trim()] });
      setNewGeo("");
    }
  };

  const removeGeo = (geo: string) => {
    onChange({ ...data, geographies: data.geographies.filter((g) => g !== geo) });
  };

  const addPersona = () => {
    if (newPersona.trim() && !data.personas.includes(newPersona.trim())) {
      onChange({ ...data, personas: [...data.personas, newPersona.trim()] });
      setNewPersona("");
    }
  };

  const removePersona = (persona: string) => {
    onChange({ ...data, personas: data.personas.filter((p) => p !== persona) });
  };

  return (
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
          <Button
            size="icon"
            onClick={addValue}
            disabled={!newValue.trim()}
            data-testid="button-add-value"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {data.valueProposition.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.valueProposition.map((value, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => removeValue(value)}
                data-testid={`badge-value-${index}`}
              >
                {value}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Primary Geography</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add location (e.g., North America, EMEA, APAC)..."
            value={newGeo}
            onChange={(e) => setNewGeo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGeo();
              }
            }}
            data-testid="input-geography"
          />
          <Button
            size="icon"
            onClick={addGeo}
            disabled={!newGeo.trim()}
            data-testid="button-add-geo"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {data.geographies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.geographies.map((geo, index) => (
              <Badge
                key={index}
                variant="default"
                className="cursor-pointer gap-1"
                onClick={() => removeGeo(geo)}
                data-testid={`badge-geo-${index}`}
              >
                {geo}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Target Personas</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add persona (e.g., VP Sales, Head of Marketing)..."
            value={newPersona}
            onChange={(e) => setNewPersona(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPersona();
              }
            }}
            data-testid="input-persona"
          />
          <Button
            size="icon"
            onClick={addPersona}
            disabled={!newPersona.trim()}
            data-testid="button-add-persona"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {data.personas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.personas.map((persona, index) => (
              <Badge
                key={index}
                variant="default"
                className="cursor-pointer gap-1"
                onClick={() => removePersona(persona)}
                data-testid={`badge-persona-${index}`}
              >
                {persona}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
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
  );
}
