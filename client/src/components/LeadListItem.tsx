import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeadListItemProps {
  id: string;
  company: string;
  contact: string;
  title: string;
  icpScore: number;
  intentScore: number;
  stage: string;
  nextAction: string;
  due: string;
  onClick: () => void;
  isActive?: boolean;
  testId?: string;
}

export function LeadListItem({
  company,
  contact,
  title,
  icpScore,
  intentScore,
  stage,
  nextAction,
  due,
  onClick,
  isActive,
  testId,
}: LeadListItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-muted-foreground";
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b hover-elevate ${
        isActive ? "bg-accent" : ""
      }`}
      data-testid={testId}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {getInitials(contact)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate" data-testid={`${testId}-contact`}>
              {contact}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {title}
            </span>
          </div>
          <div className="text-sm text-muted-foreground truncate" data-testid={`${testId}-company`}>
            {company}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {stage}
            </Badge>
            <span className="text-xs text-muted-foreground">{nextAction}</span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="flex gap-2 justify-end">
            <span className={`text-xs font-mono ${getScoreColor(icpScore)}`}>
              ICP {icpScore}
            </span>
            <span className={`text-xs font-mono ${getScoreColor(intentScore)}`}>
              INT {intentScore}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">{due}</div>
        </div>
      </div>
    </button>
  );
}
