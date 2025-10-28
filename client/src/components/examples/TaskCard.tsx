import { TaskCard } from "../TaskCard";

export default function TaskCardExample() {
  return (
    <div className="p-6 bg-background space-y-4 max-w-2xl">
      <TaskCard
        type="email"
        title="First Personalized Email"
        content="Hi Sarah,

I noticed Acme Corp recently raised a Series B round - congratulations! With your team expanding, I imagine managing sales operations across new markets is becoming increasingly complex.

At SDR Copilot, we help VP Sales leaders like yourself streamline outreach and increase meeting conversion rates by 3x through AI-powered personalization.

Would you be open to a quick 15-minute call next week to discuss how we can support Acme's growth?

Best,
John

P.S. I've attached a case study showing how a similar SaaS company increased their pipeline by 40% in Q1."
        onApprove={() => console.log("Email approved")}
        onEdit={(content) => console.log("Email edited:", content)}
        onReject={() => console.log("Email rejected")}
        testId="task-email-1"
      />

      <TaskCard
        type="linkedin"
        title="LinkedIn Connection Request"
        content="Hi Sarah - saw your post about Acme's Series B. Impressive growth! I help VP Sales leaders scale outreach efficiently. Would love to connect and share some insights."
        onComplete={() => console.log("LinkedIn task completed")}
        testId="task-linkedin-1"
      />

      <TaskCard
        type="call"
        title="Call Script"
        scheduledDate="Tomorrow 10:00 AM"
        content="Opening (15 sec):
Hi Sarah, this is John from SDR Copilot. I know you're busy, so I'll be brief - I noticed Acme just raised a Series B and wanted to share how we've helped similar companies scale their sales outreach during rapid growth.

Questions (20 sec):
1. As you're expanding into new markets, what's your biggest challenge with coordinating outreach across your sales team?
2. How are you currently managing personalization at scale?

Next Step (10 sec):
Based on what you've shared, I think a quick demo would be valuable. How does next Tuesday at 2 PM look for a 15-minute walkthrough?"
        onComplete={() => console.log("Call logged")}
        testId="task-call-1"
      />
    </div>
  );
}
