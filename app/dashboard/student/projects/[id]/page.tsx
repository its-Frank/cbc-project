"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  FileText,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

// Mock data for projects
const mockProjects = {
  "1": {
    id: 1,
    title: "Solar System Model",
    date: "April 12, 2025",
    status: "Approved",
    description:
      "A 3D model of the solar system showing the relative positions and sizes of planets. The model includes detailed information about each planet and demonstrates the orbital mechanics of our solar system.",
    files: [
      { name: "project_description.pdf", size: "1.2 MB" },
      { name: "solar_system_model.jpg", size: "3.5 MB" },
      { name: "planet_details.docx", size: "850 KB" },
    ],
    feedback: [
      {
        id: 1,
        from: { name: "Ms. Johnson", role: "Teacher" },
        date: "April 15, 2025",
        message:
          "Excellent work on your solar system model! Your attention to detail in representing the relative sizes and distances of the planets is impressive. The accompanying documentation clearly explains your research and process.",
      },
      {
        id: 2,
        from: { name: "Mr. Smith", role: "Parent" },
        date: "April 16, 2025",
        message:
          "I'm very proud of your solar system project! The way you painted each planet with accurate details shows how much research you did. Great job explaining your work during our family presentation night.",
      },
    ],
    competencies: [
      { name: "Communication", score: 90 },
      { name: "Critical Thinking", score: 85 },
      { name: "Creativity", score: 95 },
    ],
  },
  "2": {
    id: 2,
    title: "Water Filtration System",
    date: "March 28, 2025",
    status: "Under Review",
    description:
      "A prototype water filtration system using sustainable materials. This project demonstrates how common materials can be used to create an effective water filtration system for areas with limited access to clean water.",
    files: [
      { name: "filtration_design.pdf", size: "2.1 MB" },
      { name: "experiment_results.xlsx", size: "850 KB" },
      { name: "prototype_photos.zip", size: "4.5 MB" },
    ],
    feedback: [],
    competencies: [],
  },
  "3": {
    id: 3,
    title: "Recycled Art Project",
    date: "March 15, 2025",
    status: "Approved",
    description:
      "Art created from recycled materials to promote environmental awareness. This project transforms everyday waste items into a meaningful art piece that conveys a powerful message about sustainability.",
    files: [
      { name: "art_project.pdf", size: "1.5 MB" },
      { name: "recycled_art_photos.zip", size: "4.2 MB" },
      { name: "artist_statement.docx", size: "720 KB" },
    ],
    feedback: [
      {
        id: 4,
        from: { name: "Mr. Williams", role: "Teacher" },
        date: "March 20, 2025",
        message:
          "Your recycled art project demonstrates exceptional creativity and environmental awareness. The way you transformed everyday waste items into a meaningful art piece conveys a powerful message about sustainability.",
      },
      {
        id: 5,
        from: { name: "Mrs. Davis", role: "Parent" },
        date: "March 22, 2025",
        message:
          "What a creative way to use recycled materials! I love how you turned things we would normally throw away into something beautiful. Your explanation of what each part represents shows how much thought you put into this.",
      },
    ],
    competencies: [
      { name: "Creativity", score: 98 },
      { name: "Communication", score: 85 },
      { name: "Critical Thinking", score: 80 },
    ],
  },
};

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Unwrap params using React.use
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  useEffect(() => {
    // In a real app, fetch the project data from the API
    // For now, we'll use mock data based on the ID
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

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger a file download
    // For this mock implementation, we'll just show an alert
    alert(`Downloading ${fileName}...`);

    // In a real implementation, you would use something like:
    // const link = document.createElement('a')
    // link.href = `/api/download?file=${encodeURIComponent(fileName)}`
    // link.download = fileName
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
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
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <div className="ml-auto flex items-center">
          {project.status === "Approved" ? (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Approved
            </Badge>
          ) : (
            <Badge variant="warning" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Under Review
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
              <CardDescription>Submitted on {project.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{project.description}</p>

              <div>
                <h3 className="text-sm font-medium mb-2">Files</h3>
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
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge
                    variant={
                      project.status === "Approved" ? "success" : "warning"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Submission Date</span>
                  <span className="text-sm font-medium">{project.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Files</span>
                  <span className="text-sm font-medium">
                    {project.files.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feedback</span>
                  <span className="text-sm font-medium">
                    {project.feedback.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {project.competencies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Competency Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.competencies.map((comp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">{comp.name}</div>
                        <div className="text-muted-foreground">
                          {comp.score}%
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {project.feedback.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.feedback.map((item) => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.from.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.from.role}</Badge>
                          <p className="text-xs text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
