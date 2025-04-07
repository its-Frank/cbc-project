"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, Download } from "lucide-react";

export default function StudentProjects() {
  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "Solar System Model",
      date: "April 12, 2025",
      status: "Approved",
      description:
        "A 3D model of the solar system showing the relative positions and sizes of planets.",
      files: [
        { name: "project_description.pdf", size: "1.2 MB" },
        { name: "solar_system_model.jpg", size: "3.5 MB" },
      ],
    },
    {
      id: 2,
      title: "Water Filtration System",
      date: "March 28, 2025",
      status: "Under Review",
      description:
        "A prototype water filtration system using sustainable materials.",
      files: [
        { name: "filtration_design.pdf", size: "2.1 MB" },
        { name: "experiment_results.xlsx", size: "850 KB" },
      ],
    },
    {
      id: 3,
      title: "Recycled Art Project",
      date: "March 15, 2025",
      status: "Approved",
      description:
        "Art created from recycled materials to promote environmental awareness.",
      files: [
        { name: "art_project.pdf", size: "1.5 MB" },
        { name: "recycled_art_photos.zip", size: "4.2 MB" },
      ],
    },
  ];

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
        <Link href="/dashboard/student/submit">
          <Button>Submit New Project</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>Submitted on {project.date}</CardDescription>
                </div>
                <div className="flex items-center">
                  {project.status === "Approved" ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-muted-foreground">
                        Approved
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-xs text-muted-foreground">
                        Under Review
                      </span>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
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
              <div className="flex justify-end">
                <Link href={`/dashboard/student/projects/${project.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
