import { SequenceStep } from "@/components/SequenceStep";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockSequences = [
  {
    id: "1",
    name: "High-Intent Outreach",
    replyRate: 32,
    meetings: 18,
    bounceRate: 1.5,
  },
  {
    id: "2",
    name: "Hiring Hook Sequence",
    replyRate: 28,
    meetings: 12,
    bounceRate: 2.1,
  },
  {
    id: "3",
    name: "Funding Announcement",
    replyRate: 35,
    meetings: 15,
    bounceRate: 1.2,
  },
];

const mockSteps = [
  {
    id: "1",
    order: 1,
    channel: "email" as const,
    waitDays: 0,
    templateName: "Initial outreach - Funding hook",
  },
  {
    id: "2",
    order: 2,
    channel: "linkedin" as const,
    waitDays: 2,
    templateName: "LinkedIn connection request",
  },
  {
    id: "3",
    order: 3,
    channel: "email" as const,
    waitDays: 4,
    templateName: "Follow-up email - Case study",
  },
  {
    id: "4",
    order: 4,
    channel: "call" as const,
    waitDays: 3,
    templateName: "Discovery call script",
  },
];

export default function Sequences() {
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating || selectedSequence) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedSequence(null);
              setIsCreating(false);
            }}
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {isCreating ? "Create New Sequence" : "Edit Sequence"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Configure outreach touchpoints and timing
            </p>
          </div>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sequence Name</label>
            <Input
              placeholder="e.g., High-Intent Outreach"
              defaultValue={isCreating ? "" : "High-Intent Outreach"}
              data-testid="input-sequence-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Throttle</label>
              <Input
                type="number"
                placeholder="Max sends per day"
                defaultValue="50"
                data-testid="input-throttle"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Steps</label>
              <Input
                type="number"
                placeholder="Maximum steps"
                defaultValue="5"
                data-testid="input-max-steps"
              />
            </div>
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sequence Steps</h2>
            <Button size="sm" data-testid="button-add-step">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>

          <div className="space-y-3">
            {mockSteps.map((step) => (
              <SequenceStep
                key={step.id}
                {...step}
                onEdit={(days) => console.log(`Update step ${step.id} wait to ${days}d`)}
                onDelete={() => console.log(`Delete step ${step.id}`)}
                testId={`step-${step.id}`}
              />
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-sm font-medium mb-4">Template Editor</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Channel</label>
              <Select defaultValue="email">
                <SelectTrigger data-testid="select-template-channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Template Body</label>
              <Textarea
                placeholder="Use variables like {{company}}, {{first_name}}, {{signal_summary}}"
                className="min-h-[200px] font-mono text-sm"
                defaultValue="Hi {{first_name}},&#10;&#10;I noticed {{company}} {{signal_summary}}. Congratulations!&#10;&#10;As you scale, you might be interested in how SDR Copilot helps companies like yours increase outreach efficiency by 3x.&#10;&#10;Would you be open to a quick call next week?"
                data-testid="textarea-template"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="cursor-pointer">
                {"{{company}}"}
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                {"{{first_name}}"}
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                {"{{last_name}}"}
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                {"{{title}}"}
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                {"{{signal_summary}}"}
              </Badge>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button data-testid="button-save-sequence">Save Sequence</Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSequence(null);
              setIsCreating(false);
            }}
            data-testid="button-cancel-sequence"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sequences</h1>
          <p className="text-sm text-muted-foreground">
            Configure outreach flows and templates
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} data-testid="button-create-sequence">
          <Plus className="h-4 w-4 mr-2" />
          Create Sequence
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSequences.map((sequence) => (
          <Card
            key={sequence.id}
            className="p-6 hover-elevate cursor-pointer"
            onClick={() => setSelectedSequence(sequence.id)}
            data-testid={`sequence-card-${sequence.id}`}
          >
            <h3 className="font-semibold mb-4">{sequence.name}</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reply Rate</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {sequence.replyRate}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meetings</span>
                <span className="font-semibold">{sequence.meetings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold">{sequence.bounceRate}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
