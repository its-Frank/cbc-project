import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Award } from "lucide-react";

export default function StudentCompetencies() {
  // Mock competency data
  const competencies = [
    {
      name: "Communication",
      description: "Ability to express ideas clearly and effectively",
      score: 85,
      projects: [
        { name: "Solar System Model", score: 90 },
        { name: "Recycled Art Project", score: 80 },
      ],
      criteria: [
        { name: "Clarity of Expression", score: 88 },
        { name: "Organization of Ideas", score: 85 },
        { name: "Use of Visual Aids", score: 82 },
      ],
    },
    {
      name: "Collaboration",
      description: "Ability to work effectively with others",
      score: 92,
      projects: [
        { name: "Water Filtration System", score: 95 },
        { name: "Recycled Art Project", score: 90 },
      ],
      criteria: [
        { name: "Team Contribution", score: 94 },
        { name: "Respect for Others", score: 95 },
        { name: "Task Completion", score: 88 },
      ],
    },
    {
      name: "Critical Thinking",
      description: "Ability to analyze and evaluate information",
      score: 78,
      projects: [
        { name: "Solar System Model", score: 75 },
        { name: "Water Filtration System", score: 80 },
      ],
      criteria: [
        { name: "Problem Analysis", score: 80 },
        { name: "Evidence Evaluation", score: 75 },
        { name: "Solution Development", score: 78 },
      ],
    },
    {
      name: "Creativity",
      description: "Ability to generate innovative ideas and solutions",
      score: 90,
      projects: [
        { name: "Recycled Art Project", score: 95 },
        { name: "Solar System Model", score: 85 },
      ],
      criteria: [
        { name: "Originality", score: 92 },
        { name: "Flexibility", score: 88 },
        { name: "Elaboration", score: 90 },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Competencies</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {competencies.map((comp) => (
          <Card key={comp.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{comp.name}</CardTitle>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{comp.score}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {comp.description}
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${comp.score}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details">Competency Details</TabsTrigger>
          <TabsTrigger value="projects">Projects Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6 mt-6">
          {competencies.map((comp) => (
            <Card key={comp.name}>
              <CardHeader>
                <CardTitle>{comp.name}</CardTitle>
                <CardDescription>{comp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-sm font-medium mb-4">
                  Assessment Criteria
                </h3>
                <div className="space-y-4">
                  {comp.criteria.map((criterion) => (
                    <div key={criterion.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">{criterion.name}</div>
                        <div className="text-muted-foreground">
                          {criterion.score}%
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${criterion.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="projects" className="space-y-6 mt-6">
          {competencies.map((comp) => (
            <Card key={comp.name}>
              <CardHeader>
                <CardTitle>{comp.name} - Project Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comp.projects.map((project) => (
                    <div key={project.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium flex items-center">
                          <Award className="h-4 w-4 mr-2 text-primary" />
                          {project.name}
                        </div>
                        <div className="text-muted-foreground">
                          {project.score}%
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${project.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
