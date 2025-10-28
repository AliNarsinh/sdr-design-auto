import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface TodoItem {
  count: number;
  description: string;
  href: string;
  testId: string;
}

interface TodoPanelProps {
  items: TodoItem[];
}

export function TodoPanel({ items }: TodoPanelProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Today's To-Dos</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            <button
              className="w-full text-left flex items-center justify-between hover-elevate active-elevate-2 p-4 rounded-md border"
              data-testid={item.testId}
            >
              <div>
                <div className="text-2xl font-semibold mb-1" data-testid={`${item.testId}-count`}>
                  {item.count}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
