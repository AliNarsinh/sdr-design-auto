import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  testId?: string;
}

export function KPICard({ label, value, change, testId }: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className="p-4" data-testid={testId}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
          {label}
        </p>
        <p className="text-3xl font-semibold" data-testid={`${testId}-value`}>
          {value}
        </p>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive ? (
              <ArrowUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
            <span
              className={
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }
              data-testid={`${testId}-change`}
            >
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
