import { LeadDetailPanel } from "../LeadDetailPanel";

export default function LeadDetailPanelExample() {
  return (
    <div className="p-6 bg-background max-w-2xl">
      <LeadDetailPanel
        company="Acme Corp"
        contact="Sarah Johnson"
        title="VP Sales"
        email="sarah.johnson@acme.corp"
        phone="+1 (555) 123-4567"
        linkedin="https://linkedin.com/in/sarahjohnson"
        icpScore={85}
        signals={[
          { type: "funding", label: "Series B" },
          { type: "hiring", label: "15 roles" },
        ]}
        companyBrief="Acme Corp is a fast-growing B2B SaaS company that recently raised a $25M Series B led by Sequoia Capital (announced March 15, 2024). The company provides project management tools for distributed teams and is expanding rapidly into European markets. With 120 employees and strong product-market fit, they match our ICP perfectly as a scaling SaaS company needing sales operations support."
        notes="Initial call went well - Sarah mentioned they're currently using Salesforce but struggling with personalization at scale. Follow up with demo next Tuesday."
        onUpdateNotes={(notes) => console.log("Notes updated:", notes)}
        testId="lead-detail"
      />
    </div>
  );
}
