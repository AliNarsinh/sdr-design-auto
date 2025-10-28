import { TodoPanel } from "../TodoPanel";

export default function TodoPanelExample() {
  const todos = [
    {
      count: 8,
      description: "Emails to approve",
      href: "/leads?filter=pending-approval",
      testId: "todo-emails",
    },
    {
      count: 5,
      description: "LinkedIn tasks",
      href: "/leads?filter=linkedin",
      testId: "todo-linkedin",
    },
    {
      count: 3,
      description: "Calls to make",
      href: "/leads?filter=calls",
      testId: "todo-calls",
    },
  ];

  return (
    <div className="p-6 bg-background max-w-md">
      <TodoPanel items={todos} />
    </div>
  );
}
