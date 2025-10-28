import { SequenceStep } from "../SequenceStep";

export default function SequenceStepExample() {
  return (
    <div className="p-6 bg-background space-y-3 max-w-2xl">
      <SequenceStep
        order={1}
        channel="email"
        waitDays={0}
        templateName="Initial outreach - Funding hook"
        onEdit={(days) => console.log("Updated wait days:", days)}
        onDelete={() => console.log("Delete step 1")}
        testId="step-1"
      />
      <SequenceStep
        order={2}
        channel="linkedin"
        waitDays={2}
        templateName="LinkedIn connection request"
        onEdit={(days) => console.log("Updated wait days:", days)}
        onDelete={() => console.log("Delete step 2")}
        testId="step-2"
      />
      <SequenceStep
        order={3}
        channel="email"
        waitDays={4}
        templateName="Follow-up email - Case study"
        onEdit={(days) => console.log("Updated wait days:", days)}
        onDelete={() => console.log("Delete step 3")}
        testId="step-3"
      />
      <SequenceStep
        order={4}
        channel="call"
        waitDays={3}
        templateName="Discovery call script"
        onEdit={(days) => console.log("Updated wait days:", days)}
        onDelete={() => console.log("Delete step 4")}
        testId="step-4"
      />
    </div>
  );
}
