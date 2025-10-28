import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users as UsersIcon, Eye } from "lucide-react";

interface AlertItemProps {
  company: string;
  signalType: "funding" | "hiring" | "site_visit";
  reason: string;
  detectedAt: string;
  recommendedAction: string;
  onClick?: () => void;
  onImport?: () => void;
  testId?: string;
}

const signalConfig = {
  funding: {
    icon: TrendingUp,
    label: "Funding",
    variant: "default" as const,
  },
  hiring: {
    icon: UsersIcon,
    label: "Hiring",
    variant: "secondary" as const,
  },
  site_visit: {
    icon: Eye,
    label: "Site Visit",
    variant: "outline" as const,
  },
};

export function AlertItem({
  company,
  signalType,
  reason,
  detectedAt,
  recommendedAction,
  onClick,
  onImport,
  testId,
}: AlertItemProps) {
  const config = signalConfig[signalType];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border-b hover-elevate"
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium" data-testid={`${testId}-company`}>
              {company}
            </h3>
            <Badge variant={config.variant} className="gap-1">
              <Icon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground" data-testid={`${testId}-reason`}>
            {reason}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{detectedAt}</span>
            <span>•</span>
            <span>{recommendedAction}</span>
          </div>
        </div>

        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onImport?.();
          }}
          data-testid={`${testId}-button-import`}
        >
          Import to Leads
        </Button>
      </div>
    </button>
  );
}
