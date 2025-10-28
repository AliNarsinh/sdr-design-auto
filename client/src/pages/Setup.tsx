import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { useLocation } from "wouter";

export default function Setup() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [icpData, setIcpData] = useState({
    industries: "",
    headcount: "",
    geographies: "",
    keywords: "",
  });

  const handleComplete = () => {
    console.log("Setup completed, redirecting to dashboard");
    setLocation("/");
  };

  const steps = [
    { number: 1, label: "Company Data" },
    { number: 2, label: "ICP Profile" },
    { number: 3, label: "Target List" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Setup Your SDR Copilot
          </h1>
          <p className="text-muted-foreground">
            Define your ideal customer profile to get started
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
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.number
                      ? "border-primary"
                      : "border-muted"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-4 w-4" />
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
                  className={`h-0.5 w-12 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Add Company Data</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Import your initial company list to get started
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Import CSV</p>
                <p className="text-xs text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  data-testid="input-csv-upload"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Textarea
                placeholder="Paste company list (one per line)&#10;Example:&#10;Acme Corp, acme.com&#10;TechStart Inc, techstart.io"
                className="min-h-[120px]"
                data-testid="textarea-company-list"
              />

              <div className="bg-muted p-4 rounded-md text-sm">
                <p className="font-medium mb-2">Required fields:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Company name</li>
                  <li>Domain</li>
                </ul>
                <p className="font-medium mt-3 mb-2">Optional fields:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Industry</li>
                  <li>Headcount</li>
                  <li>Geography</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Define Your ICP (Ideal Customer Profile)
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Help us understand who you're targeting
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Industries</label>
                <Input
                  placeholder="e.g., SaaS, FinTech, E-commerce"
                  value={icpData.industries}
                  onChange={(e) =>
                    setIcpData({ ...icpData, industries: e.target.value })
                  }
                  data-testid="input-industries"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Headcount Bands</label>
                <Input
                  placeholder="e.g., 50-200, 200-500"
                  value={icpData.headcount}
                  onChange={(e) =>
                    setIcpData({ ...icpData, headcount: e.target.value })
                  }
                  data-testid="input-headcount"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Geographies</label>
                <Input
                  placeholder="e.g., North America, Europe, APAC"
                  value={icpData.geographies}
                  onChange={(e) =>
                    setIcpData({ ...icpData, geographies: e.target.value })
                  }
                  data-testid="input-geographies"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Keywords (Roles, Pain Points)
                </label>
                <Textarea
                  placeholder="e.g., VP Sales, Head of Operations, scaling challenges, sales automation"
                  value={icpData.keywords}
                  onChange={(e) =>
                    setIcpData({ ...icpData, keywords: e.target.value })
                  }
                  className="min-h-[100px]"
                  data-testid="textarea-keywords"
                />
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">ICP Score Formula</h3>
                <p className="text-xs text-muted-foreground">
                  We calculate ICP scores based on industry match (30%), company
                  size fit (25%), geography match (20%), tech stack alignment
                  (15%), and keyword relevance (10%). Scores of 70+ indicate
                  strong ICP fit.
                </p>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Initial Target List
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Add your starting contacts and assign sequences
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste contacts (format: Name, Email, Company)&#10;Example:&#10;Sarah Johnson, sarah@acme.com, Acme Corp&#10;Michael Chen, m.chen@techstart.io, TechStart Inc"
                className="min-h-[150px]"
                data-testid="textarea-contact-list"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Assign to Sequence (Optional)
                </label>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="cursor-pointer hover-elevate">
                    High-Intent Outreach
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover-elevate">
                    Hiring Hook Sequence
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover-elevate">
                    Funding Announcement
                  </Badge>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Preview</p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total contacts to import:</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With ICP score ≥70:</span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            Back
          </Button>

          <div className="flex gap-3">
            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                data-testid="button-next"
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} data-testid="button-complete">
                Save & Start
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
