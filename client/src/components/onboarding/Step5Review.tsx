import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Database, Target, Users } from "lucide-react";

interface Step5Props {
  projectData: any;
  dataSourcesData: any;
  icpsData: any;
  leadsData: any;
}

export function Step5Review({
  projectData,
  dataSourcesData,
  icpsData,
  leadsData,
}: Step5Props) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Project Overview</h3>
            <p className="text-sm text-muted-foreground">
              {projectData.projectName || "Untitled Project"}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 pl-13">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Company Description
            </p>
            <p className="text-sm">
              {projectData.companyDescription || "Not provided"}
            </p>
          </div>
          
          {projectData.valueProposition?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Value Propositions
              </p>
              <div className="flex flex-wrap gap-1">
                {projectData.valueProposition.map((value: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Target Markets
              </p>
              <p className="text-sm">
                {projectData.geographies?.join(", ") || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Target Personas
              </p>
              <p className="text-sm">
                {projectData.personas?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Data Sources</h3>
            <p className="text-sm text-muted-foreground">
              {dataSourcesData.primaryWebsite || "No website configured"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pl-13">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Key URLs ({dataSourcesData.keyUrls?.length || 0})
            </p>
            <div className="flex flex-wrap gap-2">
              {dataSourcesData.keyUrls?.map((url: any, index: number) => (
                <Badge key={index} variant="outline">
                  {url.label}
                </Badge>
              ))}
            </div>
          </div>

          {dataSourcesData.thirdPartySignals?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Third-Party Signals
              </p>
              <div className="flex flex-wrap gap-2">
                {dataSourcesData.thirdPartySignals.map((signal: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {signal}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">ICP Profiles</h3>
            <p className="text-sm text-muted-foreground">
              {icpsData.icps?.length || 0} profile(s) defined
            </p>
          </div>
        </div>

        <div className="space-y-4 pl-13">
          {icpsData.icps?.map((icp: any, index: number) => (
            <div key={icp.id} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{icp.name}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Industries</p>
                  <div className="flex flex-wrap gap-1">
                    {icp.industries?.map((ind: string) => (
                      <Badge key={ind} variant="outline" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Size Bands</p>
                  <div className="flex flex-wrap gap-1">
                    {icp.sizeBands?.map((size: string) => (
                      <Badge key={size} variant="outline" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Geographies</p>
                  <p className="text-xs">{icp.geographies?.join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tech Stack</p>
                  <p className="text-xs">
                    {icp.techStack?.length > 0 ? icp.techStack.join(", ") : "Any"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Initial Leads</h3>
            <p className="text-sm text-muted-foreground">
              {leadsData.uploadedLeads?.length || 0} lead(s) uploaded
            </p>
          </div>
        </div>

        {leadsData.uploadedLeads?.length > 0 && (
          <div className="pl-13">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  {leadsData.uploadedLeads.filter((l: any) => l.status === "ready").length}
                </div>
                <div className="text-xs text-muted-foreground">Ready to Push</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                  {leadsData.uploadedLeads.filter((l: any) => l.status === "researching").length}
                </div>
                <div className="text-xs text-muted-foreground">Researching</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {leadsData.uploadedLeads.filter((l: any) => 
                    !["ready", "researching"].includes(l.status)
                  ).length}
                </div>
                <div className="text-xs text-muted-foreground">Other</div>
              </div>
            </div>
            
            {leadsData.assignedSequence && leadsData.assignedSequence !== "none" && (
              <div className="mt-4 p-3 bg-accent/30 rounded-lg">
                <p className="text-sm">
                  <strong>Assigned Sequence:</strong> {leadsData.assignedSequence}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <div className="space-y-2 text-sm">
          <p>
            ✓ We'll prioritize your leads based on ICP scores and readiness
          </p>
          <p>
            ✓ "Ready to Push" leads will appear in your To-Do list immediately
          </p>
          <p>
            ✓ Leads still being researched will move to Ready as they're completed
          </p>
          <p>
            ✓ You can start reviewing and approving outreach tasks right away
          </p>
        </div>
      </Card>
    </div>
  );
}
