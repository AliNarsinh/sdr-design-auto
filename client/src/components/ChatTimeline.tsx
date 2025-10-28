import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { User, Bot, Bell } from "lucide-react";

interface Message {
  id: string;
  author: "sdr" | "customer" | "system" | "ai";
  text: string;
  timestamp: string;
}

interface ChatTimelineProps {
  messages: Message[];
  onAddMessage?: (text: string) => void;
  testId?: string;
}

export function ChatTimeline({ messages, onAddMessage, testId }: ChatTimelineProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddMessage?.(input);
      setInput("");
    }
  };

  const getIcon = (author: Message["author"]) => {
    switch (author) {
      case "sdr":
        return <User className="h-4 w-4" />;
      case "customer":
        return <User className="h-4 w-4 text-primary" />;
      case "ai":
        return <Bot className="h-4 w-4 text-primary" />;
      case "system":
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLabel = (author: Message["author"]) => {
    switch (author) {
      case "sdr":
        return "You";
      case "customer":
        return "Customer";
      case "ai":
        return "AI Suggestion";
      case "system":
        return "System";
    }
  };

  return (
    <Card className="flex flex-col" data-testid={testId}>
      <div className="p-4 border-b">
        <h3 className="font-medium">Conversation Timeline</h3>
      </div>

      <ScrollArea className="flex-1 h-96">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-1">
              <div className="flex items-center gap-2">
                {getIcon(message.author)}
                <span className="text-xs font-medium">{getLabel(message.author)}</span>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
              <div
                className={`text-sm pl-6 ${
                  message.author === "system"
                    ? "text-muted-foreground italic"
                    : ""
                }`}
                data-testid={`${testId}-message-${message.id}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type customer reply or note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-testid={`${testId}-input`}
          />
          <Button type="submit" size="sm" data-testid={`${testId}-button-save`}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
}
