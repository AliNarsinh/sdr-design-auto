import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Trash2 } from "lucide-react";
import { useState } from "react";

interface ICP {
  id: string;
  name: string;
  industries: string[];
  sizeBands: string[];
  geographies: string[];
  techStack: string[];
  triggerSignals: string[];
  disqualifiers: string[];
}

interface Step3Props {
  data: { icps: ICP[] };
  onChange: (data: { icps: ICP[] }) => void;
}

const industryOptions = ["SaaS", "FinTech", "E-commerce", "HealthTech", "MarTech", "HR Tech"];
const sizeOptions = ["1-50", "51-200", "201-1000", "1000+"];
const geoOptions = ["North America", "Europe", "APAC", "Latin America"];
const techOptions = ["HubSpot", "Salesforce", "Snowflake", "Segment", "Intercom"];

export function Step3ICPs({ data, onChange }: Step3Props) {
  const [activeIcpId, setActiveIcpId] = useState(data.icps[0]?.id || "");
  const activeIcp = data.icps.find((icp) => icp.id === activeIcpId);

  const [newTrigger, setNewTrigger] = useState("");
  const [newDisqualifier, setNewDisqualifier] = useState("");

  const addIcp = () => {
    const newIcp: ICP = {
      id: Date.now().toString(),
      name: `ICP ${data.icps.length + 1}`,
      industries: [],
      sizeBands: [],
      geographies: [],
      techStack: [],
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

  const toggleOption = (field: keyof ICP, value: string) => {
    if (!activeIcp) return;
    const current = activeIcp[field] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateIcp({ [field]: updated });
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
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
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
            <Label>
              Industries <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {industryOptions.map((industry) => (
                <Badge
                  key={industry}
                  variant={activeIcp.industries.includes(industry) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleOption("industries", industry)}
                  data-testid={`badge-industry-${industry}`}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Company Size Bands <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <Badge
                  key={size}
                  variant={activeIcp.sizeBands.includes(size) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleOption("sizeBands", size)}
                  data-testid={`badge-size-${size}`}
                >
                  {size} employees
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Geographies <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {geoOptions.map((geo) => (
                <Badge
                  key={geo}
                  variant={activeIcp.geographies.includes(geo) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleOption("geographies", geo)}
                  data-testid={`badge-geo-${geo}`}
                >
                  {geo}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tech Stack Signals (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => (
                <Badge
                  key={tech}
                  variant={activeIcp.techStack.includes(tech) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleOption("techStack", tech)}
                  data-testid={`badge-tech-${tech}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
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

      <div>
        <Card className="p-6 bg-accent/30 sticky top-6">
          <h3 className="font-semibold mb-3">ICP Scoring Preview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Industry match</span>
              <span className="font-mono">+30</span>
            </div>
            <div className="flex justify-between">
              <span>Size band</span>
              <span className="font-mono">+20</span>
            </div>
            <div className="flex justify-between">
              <span>Geography</span>
              <span className="font-mono">+15</span>
            </div>
            <div className="flex justify-between">
              <span>Tech stack presence</span>
              <span className="font-mono">+10</span>
            </div>
            <div className="flex justify-between">
              <span>Trigger signal (60d)</span>
              <span className="font-mono">+10</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Low activity</span>
              <span className="font-mono">-15</span>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                Scores of 70+ indicate strong ICP fit and will be prioritized in your lead list.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
