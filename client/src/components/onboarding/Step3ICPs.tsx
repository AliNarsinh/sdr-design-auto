import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Trash2 } from "lucide-react";
import { useState } from "react";

interface ICP {
  id: string;
  name: string;
  industries: string;
  companySize: string;
  geographies: string;
  techStack: string;
  triggerSignals: string[];
  disqualifiers: string[];
}

interface Step3Props {
  data: { icps: ICP[] };
  onChange: (data: { icps: ICP[] }) => void;
}

export function Step3ICPs({ data, onChange }: Step3Props) {
  const [activeIcpId, setActiveIcpId] = useState(data.icps[0]?.id || "");
  const activeIcp = data.icps.find((icp) => icp.id === activeIcpId);

  const [newTrigger, setNewTrigger] = useState("");
  const [newDisqualifier, setNewDisqualifier] = useState("");

  const addIcp = () => {
    const newIcp: ICP = {
      id: Date.now().toString(),
      name: `ICP ${data.icps.length + 1}`,
      industries: "",
      companySize: "",
      geographies: "",
      techStack: "",
      triggerSignals: [],
      disqualifiers: [],
    };
    onChange({ icps: [...data.icps, newIcp] });
    setActiveIcpId(newIcp.id);
  };

  const duplicateIcp = (id: string) => {
    const icp = data.icps.find((i) => i.id === id);
    if (icp) {
      const newIcp = { ...icp, id: Date.now().toString(), name: `${icp.name} (Copy)` };
      onChange({ icps: [...data.icps, newIcp] });
    }
  };

  const deleteIcp = (id: string) => {
    const newIcps = data.icps.filter((i) => i.id !== id);
    onChange({ icps: newIcps });
    if (activeIcpId === id && newIcps.length > 0) {
      setActiveIcpId(newIcps[0].id);
    }
  };

  const updateIcp = (updates: Partial<ICP>) => {
    const newIcps = data.icps.map((icp) =>
      icp.id === activeIcpId ? { ...icp, ...updates } : icp
    );
    onChange({ icps: newIcps });
  };

  const addChip = (field: "triggerSignals" | "disqualifiers", value: string) => {
    if (!activeIcp || !value.trim()) return;
    const updated = [...activeIcp[field], value.trim()];
    updateIcp({ [field]: updated });
  };

  const removeChip = (field: "triggerSignals" | "disqualifiers", value: string) => {
    if (!activeIcp) return;
    const updated = activeIcp[field].filter((v) => v !== value);
    updateIcp({ [field]: updated });
  };

  if (!activeIcp) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b pb-4">
        {data.icps.map((icp) => (
          <Button
            key={icp.id}
            variant={icp.id === activeIcpId ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIcpId(icp.id)}
            data-testid={`button-icp-tab-${icp.id}`}
          >
            {icp.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={addIcp}
          className="gap-1"
          data-testid="button-add-icp"
        >
          <Plus className="h-3 w-3" />
          Add ICP
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <Label htmlFor="icp-name">
              ICP Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="icp-name"
              placeholder="e.g., Mid-Market SaaS US"
              value={activeIcp.name}
              onChange={(e) => updateIcp({ name: e.target.value })}
              data-testid="input-icp-name"
            />
          </div>
          <div className="flex gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => duplicateIcp(activeIcp.id)}
              data-testid="button-duplicate-icp"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteIcp(activeIcp.id)}
              disabled={data.icps.length === 1}
              data-testid="button-delete-icp"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industries">
            Industries <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="industries"
            placeholder="e.g., SaaS, FinTech, E-commerce, Enterprise Software"
            value={activeIcp.industries}
            onChange={(e) => updateIcp({ industries: e.target.value })}
            className="min-h-[60px]"
            data-testid="textarea-industries"
          />
          <p className="text-xs text-muted-foreground">
            List industries separated by commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-size">
            Company Size <span className="text-destructive">*</span>
          </Label>
          <Input
            id="company-size"
            placeholder="e.g., 50-200 employees, Mid-market, Series B+"
            value={activeIcp.companySize}
            onChange={(e) => updateIcp({ companySize: e.target.value })}
            data-testid="input-company-size"
          />
          <p className="text-xs text-muted-foreground">
            Describe your target company size
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="geographies">
            Geographies <span className="text-destructive">*</span>
          </Label>
          <Input
            id="geographies"
            placeholder="e.g., North America, EMEA, APAC"
            value={activeIcp.geographies}
            onChange={(e) => updateIcp({ geographies: e.target.value })}
            data-testid="input-geographies"
          />
          <p className="text-xs text-muted-foreground">
            List target regions separated by commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tech-stack">Tech Stack Signals (Optional)</Label>
          <Textarea
            id="tech-stack"
            placeholder="e.g., Salesforce, HubSpot, Snowflake, Segment, AWS"
            value={activeIcp.techStack}
            onChange={(e) => updateIcp({ techStack: e.target.value })}
            className="min-h-[60px]"
            data-testid="textarea-tech-stack"
          />
          <p className="text-xs text-muted-foreground">
            List technologies that indicate a good fit
          </p>
        </div>

        <div className="space-y-2">
          <Label>Trigger Signals (Optional)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., hiring for VP Sales, Series B funding"
              value={newTrigger}
              onChange={(e) => setNewTrigger(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addChip("triggerSignals", newTrigger);
                  setNewTrigger("");
                }
              }}
              data-testid="input-trigger"
            />
            <Button
              size="icon"
              onClick={() => {
                addChip("triggerSignals", newTrigger);
                setNewTrigger("");
              }}
              disabled={!newTrigger.trim()}
              data-testid="button-add-trigger"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {activeIcp.triggerSignals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeIcp.triggerSignals.map((signal, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeChip("triggerSignals", signal)}
                >
                  {signal} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Disqualifiers (Optional)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., agencies, competitors, students"
              value={newDisqualifier}
              onChange={(e) => setNewDisqualifier(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addChip("disqualifiers", newDisqualifier);
                  setNewDisqualifier("");
                }
              }}
              data-testid="input-disqualifier"
            />
            <Button
              size="icon"
              onClick={() => {
                addChip("disqualifiers", newDisqualifier);
                setNewDisqualifier("");
              }}
              disabled={!newDisqualifier.trim()}
              data-testid="button-add-disqualifier"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {activeIcp.disqualifiers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeIcp.disqualifiers.map((dis, index) => (
                <Badge
                  key={index}
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => removeChip("disqualifiers", dis)}
                >
                  {dis} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
