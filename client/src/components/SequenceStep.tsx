import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Mail, Linkedin, Phone, Trash2 } from "lucide-react";
import { useState } from "react";

interface SequenceStepProps {
  order: number;
  channel: "email" | "linkedin" | "call";
  waitDays: number;
  templateName: string;
  onEdit?: (waitDays: number) => void;
  onDelete?: () => void;
  isDragging?: boolean;
  testId?: string;
}

const channelConfig = {
  email: { icon: Mail, label: "Email", color: "bg-blue-500" },
  linkedin: { icon: Linkedin, label: "LinkedIn", color: "bg-blue-700" },
  call: { icon: Phone, label: "Call", color: "bg-green-500" },
};

export function SequenceStep({
  order,
  channel,
  waitDays,
  templateName,
  onEdit,
  onDelete,
  isDragging,
  testId,
}: SequenceStepProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDays, setEditedDays] = useState(waitDays);
  const config = channelConfig[channel];
  const Icon = config.icon;

  const handleSave = () => {
    onEdit?.(editedDays);
    setIsEditing(false);
  };

  return (
    <Card
      className={`p-4 ${isDragging ? "opacity-50" : ""}`}
      data-testid={testId}
    >
      <div className="flex items-center gap-3">
        <button
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          data-testid={`${testId}-drag-handle`}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className={`h-8 w-8 rounded ${config.color} flex items-center justify-center`}>
          <Icon className="h-4 w-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Step {order}</span>
            <Badge variant="outline" className="text-xs">
              {config.label}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {templateName}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                type="number"
                value={editedDays}
                onChange={(e) => setEditedDays(Number(e.target.value))}
                className="w-16 h-8"
                min="0"
                data-testid={`${testId}-input-days`}
              />
              <Button size="sm" onClick={handleSave} data-testid={`${testId}-button-save`}>
                Save
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-muted-foreground hover:text-foreground"
                data-testid={`${testId}-button-edit-days`}
              >
                Wait {waitDays}d
              </button>
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                data-testid={`${testId}-button-delete`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
