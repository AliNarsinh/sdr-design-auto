import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import { useLocation } from "wouter";
import { Step1ProjectDetails } from "@/components/onboarding/Step1ProjectDetails";
import { Step2DataSources } from "@/components/onboarding/Step2DataSources";
import { Step3ICPs } from "@/components/onboarding/Step3ICPs";
import { Step4UploadLeads } from "@/components/onboarding/Step4UploadLeads";
import { Step5Review } from "@/components/onboarding/Step5Review";

export default function Setup() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  const [step1Data, setStep1Data] = useState({
    projectName: "",
    companyDescription: "",
    valueProposition: [] as string[],
    geographies: [] as string[],
    personas: [] as string[],
    approveBeforeSend: true,
    linkedinManual: true,
  });

  const [step2Data, setStep2Data] = useState({
    primaryWebsite: "",
    keyUrls: [] as { label: string; url: string }[],
    documentSources: [] as { type: string; value: string }[],
    thirdPartySignals: [] as string[],
  });

  const [step3Data, setStep3Data] = useState({
    icps: [
      {
        id: "1",
        name: "ICP 1",
        industries: [] as string[],
        sizeBands: [] as string[],
        geographies: [] as string[],
        techStack: [] as string[],
        triggerSignals: [] as string[],
        disqualifiers: [] as string[],
      },
    ],
  });

  const [step4Data, setStep4Data] = useState({
    uploadMethod: "paste" as "csv" | "paste",
    pastedData: "",
    assignedSequence: "",
    uploadedLeads: [] as any[],
  });

  const handleComplete = () => {
    console.log("Setup completed, redirecting to dashboard");
    setLocation("/");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return step1Data.projectName.trim() !== "" && step1Data.companyDescription.trim() !== "";
      case 2:
        return step2Data.primaryWebsite.trim() !== "";
      case 3:
        return step3Data.icps.some(
          (icp) =>
            icp.name.trim() !== "" &&
            icp.industries.length > 0 &&
            icp.sizeBands.length > 0 &&
            icp.geographies.length > 0
        );
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, label: "Project Details" },
    { number: 2, label: "Data Sources" },
    { number: 3, label: "ICPs" },
    { number: 4, label: "Upload Leads" },
    { number: 5, label: "Review & Start" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Setup Your SDR Copilot
          </h1>
          <p className="text-muted-foreground">
            {currentStep === 1 && "Let's start by understanding your project"}
            {currentStep === 2 && "Connect your data sources"}
            {currentStep === 3 && "Define your ideal customer profiles"}
            {currentStep === 4 && "Import your initial lead list"}
            {currentStep === 5 && "Review and finalize your setup"}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  currentStep >= step.number
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep > step.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.number
                      ? "border-primary bg-primary/10"
                      : "border-muted bg-background"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 transition-all ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          {currentStep === 1 && (
            <Step1ProjectDetails data={step1Data} onChange={setStep1Data} />
          )}
          {currentStep === 2 && (
            <Step2DataSources data={step2Data} onChange={setStep2Data} />
          )}
          {currentStep === 3 && (
            <Step3ICPs data={step3Data} onChange={setStep3Data} />
          )}
          {currentStep === 4 && (
            <Step4UploadLeads
              data={step4Data}
              icps={step3Data.icps}
              onChange={setStep4Data}
            />
          )}
          {currentStep === 5 && (
            <Step5Review
              projectData={step1Data}
              dataSourcesData={step2Data}
              icpsData={step3Data}
              leadsData={step4Data}
            />
          )}
        </Card>

        <div className="flex gap-3 justify-between">
          <div>
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              data-testid="button-back"
            >
              Back
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                console.log("Saving progress...");
              }}
              data-testid="button-save-exit"
            >
              Save & Exit
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                data-testid="button-next"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                size="lg"
                className="px-8"
                data-testid="button-complete"
              >
                Start Prioritizing Leads
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Step {currentStep} of 5 • Progress saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}
