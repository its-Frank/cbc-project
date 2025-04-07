"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowLeft,
  FileText,
  CheckCircle,
  Clock,
  Download,
  MessageSquare,
} from "lucide-react";
import { use } from "react";

// Mock data for children
const childrenData = {
  "1": {
    id: "1",
    name: "John",
    grade: "8",
    projects: [
      {
        id: "1",
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
        id: "3",
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
    ],
  },
  "2": {
    id: "2",
    name: "Emma",
    grade: "6",
    projects: [
      {
        id: "2",
        title: "Community Service Documentation",
        date: "April 8, 2025",
        status: "Under Review",
        description:
          "Documentation of a community service project focused on environmental cleanup.",
        files: [
          { name: "service_plan.pdf", size: "1.8 MB" },
          { name: "activity_photos.zip", size: "5.2 MB" },
        ],
      },
    ],
  },
};

export default function ChildProjects({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Unwrap params using React.use
  const unwrappedParams = use(params);
  const childId = unwrappedParams.id;

  // Get child data
  const child = childrenData[childId as keyof typeof childrenData];

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-bold mb-2">Child Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The child you're looking for doesn't exist.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  // Filter projects based on search term
  const filteredProjects = child.projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger a file download
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {child.name}'s Projects
        </h1>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm
                  ? "Try a different search term"
                  : `${child.name} hasn't submitted any projects yet`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      Submitted on {project.date}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    {project.status === "Approved" ? (
                      <Badge
                        variant="success"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge
                        variant="warning"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        Under Review
                      </Badge>
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
                  <Link
                    href={`/dashboard/parent/feedback?project=${project.id}&child=${child.id}`}
                  >
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Provide Feedback
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
