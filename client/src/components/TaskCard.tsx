import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, Linkedin, Phone } from "lucide-react";

interface TaskCardProps {
  type: "email" | "linkedin" | "call";
  title: string;
  content: string;
  scheduledDate?: string;
  onApprove?: () => void;
  onEdit?: (content: string) => void;
  onReject?: () => void;
  onComplete?: () => void;
  testId?: string;
}

const iconMap = {
  email: Mail,
  linkedin: Linkedin,
  call: Phone,
};

export function TaskCard({
  type,
  title,
  content,
  scheduledDate,
  onApprove,
  onEdit,
  onReject,
  onComplete,
  testId,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const Icon = iconMap[type];

  const handleSave = () => {
    onEdit?.(editedContent);
    setIsEditing(false);
  };

  return (
    <Card className="p-6" data-testid={testId}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">{title}</h3>
              {scheduledDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled: {scheduledDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[150px] resize-none"
            data-testid={`${testId}-textarea`}
          />
        ) : (
          <div className="text-sm whitespace-pre-wrap" data-testid={`${testId}-content`}>
            {content}
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t flex-wrap">
          {isEditing ? (
            <>
              <Button
                size="sm"
                onClick={handleSave}
                data-testid={`${testId}-button-save`}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditedContent(content);
                  setIsEditing(false);
                }}
                data-testid={`${testId}-button-cancel`}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {onApprove && (
                <Button
                  size="sm"
                  onClick={onApprove}
                  data-testid={`${testId}-button-approve`}
                >
                  Approve & Send
                </Button>
              )}
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  data-testid={`${testId}-button-edit`}
                >
                  Edit
                </Button>
              )}
              {onReject && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onReject}
                  data-testid={`${testId}-button-reject`}
                >
                  Reject
                </Button>
              )}
              {onComplete && (
                <Button
                  size="sm"
                  onClick={onComplete}
                  data-testid={`${testId}-button-complete`}
                >
                  Mark Completed
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
