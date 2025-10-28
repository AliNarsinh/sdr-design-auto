import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RoleToggleProps {
  role: "sdr" | "manager";
  onToggle: () => void;
  testId?: string;
}

export function RoleToggle({ role, onToggle, testId }: RoleToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">View as:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="gap-2"
        data-testid={testId}
      >
        <Badge variant={role === "sdr" ? "default" : "secondary"}>
          {role === "sdr" ? "SDR" : "Manager"}
        </Badge>
      </Button>
    </div>
  );
}
