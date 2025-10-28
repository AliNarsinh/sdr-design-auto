import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Building, Mail, Linkedin, Phone, TrendingUp, Users, Eye } from "lucide-react";

interface LeadDetailPanelProps {
  company: string;
  contact: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  icpScore: number;
  signals: Array<{ type: string; label: string }>;
  companyBrief: string;
  notes: string;
  onUpdateNotes?: (notes: string) => void;
  testId?: string;
}

const signalIcons = {
  funding: TrendingUp,
  hiring: Users,
  site_visit: Eye,
};

export function LeadDetailPanel({
  company,
  contact,
  title,
  email,
  phone,
  linkedin,
  icpScore,
  signals,
  companyBrief,
  notes,
  onUpdateNotes,
  testId,
}: LeadDetailPanelProps) {
  const [editedNotes, setEditedNotes] = useState(notes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleSaveNotes = () => {
    onUpdateNotes?.(editedNotes);
    setIsEditingNotes(false);
  };

  return (
    <div className="space-y-4" data-testid={testId}>
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold" data-testid={`${testId}-contact`}>
              {contact}
            </h2>
            <p className="text-muted-foreground">{title}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge
              variant={icpScore >= 70 ? "default" : "secondary"}
              className="font-mono"
            >
              ICP {icpScore}
            </Badge>
            <div className="flex gap-1 flex-wrap justify-end">
              {signals.map((signal, index) => {
                const Icon = signalIcons[signal.type as keyof typeof signalIcons];
                return (
                  <Badge key={index} variant="outline" className="gap-1 text-xs">
                    {Icon && <Icon className="h-3 w-3" />}
                    {signal.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Brief
            </h3>
            <p className="text-sm text-muted-foreground" data-testid={`${testId}-brief`}>
              {companyBrief}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
                data-testid={`${testId}-email`}
              >
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${phone}`}
                className="text-primary hover:underline"
                data-testid={`${testId}-phone`}
              >
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid={`${testId}-linkedin`}
              >
                View LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Conversation Notes</h3>
              {!isEditingNotes && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditingNotes(true)}
                  data-testid={`${testId}-button-edit-notes`}
                >
                  Edit
                </Button>
              )}
            </div>
            {isEditingNotes ? (
              <div className="space-y-2">
                <Textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="min-h-[100px]"
                  data-testid={`${testId}-textarea-notes`}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    data-testid={`${testId}-button-save-notes`}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditedNotes(notes);
                      setIsEditingNotes(false);
                    }}
                    data-testid={`${testId}-button-cancel-notes`}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap" data-testid={`${testId}-notes`}>
                {notes || "No notes yet"}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
