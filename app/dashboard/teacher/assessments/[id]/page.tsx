"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, FileText, Loader2, User } from "lucide-react";
import { use } from "react";

// Mock project data
const mockProjects = {
  "1": {
    id: "1",
    title: "Solar System Model",
    student: "John Student",
    date: "April 12, 2025",
    description:
      "A 3D model of the solar system showing the relative positions and sizes of planets. The model includes detailed information about each planet and demonstrates the orbital mechanics of our solar system.",
    files: [
      { name: "project_description.pdf", size: "1.2 MB" },
      { name: "solar_system_model.jpg", size: "3.5 MB" },
      { name: "planet_details.docx", size: "850 KB" },
    ],
  },
  "2": {
    id: "2",
    title: "Water Filtration System",
    student: "Sarah Student",
    date: "April 10, 2025",
    description:
      "A prototype water filtration system using sustainable materials. This project demonstrates how common materials can be used to create an effective water filtration system for areas with limited access to clean water.",
    files: [
      { name: "filtration_design.pdf", size: "2.1 MB" },
      { name: "experiment_results.xlsx", size: "850 KB" },
      { name: "prototype_photos.zip", size: "4.5 MB" },
    ],
  },
  "3": {
    id: "3",
    title: "Recycled Art Project",
    student: "Michael Student",
    date: "April 8, 2025",
    description:
      "Art created from recycled materials to promote environmental awareness. This project transforms everyday waste items into a meaningful art piece that conveys a powerful message about sustainability.",
    files: [
      { name: "art_project.pdf", size: "1.5 MB" },
      { name: "recycled_art_photos.zip", size: "4.2 MB" },
      { name: "artist_statement.docx", size: "720 KB" },
    ],
  },
  "4": {
    id: "4",
    title: "Community Service Documentation",
    student: "Emma Student",
    date: "April 5, 2025",
    description:
      "Documentation of a community service project focused on environmental cleanup. This project includes planning, execution, and reflection on the impact of the service activity.",
    files: [
      { name: "service_plan.pdf", size: "1.8 MB" },
      { name: "activity_photos.zip", size: "5.2 MB" },
      { name: "reflection_essay.docx", size: "950 KB" },
    ],
  },
  "5": {
    id: "5",
    title: "Personal Finance Plan",
    student: "David Student",
    date: "April 3, 2025",
    description:
      "A comprehensive personal finance plan including budgeting, saving strategies, and investment considerations. This project demonstrates understanding of financial literacy concepts.",
    files: [
      { name: "finance_plan.pdf", size: "2.3 MB" },
      { name: "budget_spreadsheet.xlsx", size: "780 KB" },
      { name: "investment_research.docx", size: "1.1 MB" },
    ],
  },
};

export default function AssessProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [assessments, setAssessments] = useState({
    communication: "",
    collaboration: "",
    criticalThinking: "",
    creativity: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Unwrap params using React.use
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  useEffect(() => {
    // Fetch project data
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        // Get project by ID from our mock data
        const projectData =
          mockProjects[projectId as keyof typeof mockProjects];

        if (projectData) {
          setProject(projectData);
        } else {
          // If project not found, show error
          console.error("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleAssessmentChange = (competency: string, value: string) => {
    setAssessments((prev) => ({
      ...prev,
      [competency]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !assessments.communication ||
        !assessments.collaboration ||
        !assessments.criticalThinking ||
        !assessments.creativity ||
        !feedback
      ) {
        throw new Error("Please complete all assessments and provide feedback");
      }

      // In a real app, this would be an API call to submit the assessment
      // const response = await fetch(`/api/assessments/${projectId}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ assessments, feedback }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Assessment submitted successfully! 🎉",
        description:
          "The project has been assessed and feedback has been sent to the student.",
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/teacher/assessments");
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger a file download
    alert(`Downloading ${fileName}...`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Assess Project</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              Submitted by {project.student} on {project.date}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Attachments</h3>
              <div className="space-y-2">
                {project.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{file.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({file.size})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(file.name)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download {file.name}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Student Information</h3>
              <div className="flex items-center">
                <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{project.student}</p>
                  <p className="text-xs text-muted-foreground">Grade 8</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Competency Assessment</CardTitle>
              <CardDescription>
                Assess the student's competencies based on this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Communication</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ability to express ideas clearly and effectively
                  </p>
                  <RadioGroup
                    value={assessments.communication}
                    onValueChange={(value) =>
                      handleAssessmentChange("communication", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="communication-1" />
                      <Label htmlFor="communication-1">Emerging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="communication-2" />
                      <Label htmlFor="communication-2">Developing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="communication-3" />
                      <Label htmlFor="communication-3">Proficient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="communication-4" />
                      <Label htmlFor="communication-4">Exemplary</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Collaboration</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ability to work effectively with others
                  </p>
                  <RadioGroup
                    value={assessments.collaboration}
                    onValueChange={(value) =>
                      handleAssessmentChange("collaboration", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="collaboration-1" />
                      <Label htmlFor="collaboration-1">Emerging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="collaboration-2" />
                      <Label htmlFor="collaboration-2">Developing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="collaboration-3" />
                      <Label htmlFor="collaboration-3">Proficient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="collaboration-4" />
                      <Label htmlFor="collaboration-4">Exemplary</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Critical Thinking</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ability to analyze and evaluate information
                  </p>
                  <RadioGroup
                    value={assessments.criticalThinking}
                    onValueChange={(value) =>
                      handleAssessmentChange("criticalThinking", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="criticalThinking-1" />
                      <Label htmlFor="criticalThinking-1">Emerging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="criticalThinking-2" />
                      <Label htmlFor="criticalThinking-2">Developing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="criticalThinking-3" />
                      <Label htmlFor="criticalThinking-3">Proficient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="criticalThinking-4" />
                      <Label htmlFor="criticalThinking-4">Exemplary</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Creativity</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ability to generate innovative ideas and solutions
                  </p>
                  <RadioGroup
                    value={assessments.creativity}
                    onValueChange={(value) =>
                      handleAssessmentChange("creativity", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="creativity-1" />
                      <Label htmlFor="creativity-1">Emerging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="creativity-2" />
                      <Label htmlFor="creativity-2">Developing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="creativity-3" />
                      <Label htmlFor="creativity-3">Proficient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="creativity-4" />
                      <Label htmlFor="creativity-4">Exemplary</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback for Student</Label>
                <Textarea
                  id="feedback"
                  placeholder="Provide constructive feedback on the project..."
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
