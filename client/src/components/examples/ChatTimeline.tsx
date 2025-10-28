import { ChatTimeline } from "../ChatTimeline";
import { useState } from "react";

export default function ChatTimelineExample() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      author: "sdr" as const,
      text: "Initial email sent with Series B congratulations hook",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      author: "system" as const,
      text: "Email opened by recipient",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      author: "customer" as const,
      text: "Thanks for reaching out. Interesting timing - we're actually evaluating sales tools right now. Can you send over some pricing info?",
      timestamp: "18 hours ago",
    },
    {
      id: "4",
      author: "ai" as const,
      text: "Suggested next step: Send pricing deck and propose demo for next week. High intent detected - prioritize this lead.",
      timestamp: "18 hours ago",
    },
  ]);

  const handleAddMessage = (text: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      author: "sdr" as const,
      text,
      timestamp: "Just now",
    };
    setMessages([...messages, newMessage]);
    console.log("New message added:", text);
  };

  return (
    <div className="p-6 bg-background max-w-2xl">
      <ChatTimeline
        messages={messages}
        onAddMessage={handleAddMessage}
        testId="chat-timeline"
      />
    </div>
  );
}
