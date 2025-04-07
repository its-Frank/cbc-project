"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  FileText,
  CheckCircle,
  Clock,
  Download,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ParentProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [childFilter, setChildFilter] = useState("all");

  // Mock data for projects
  const projects = [
    {
      id: "1",
      title: "Solar System Model",
      child: "John",
      date: "April 12, 2025",
      status: "Approved",
      description:
        "A 3D model of the solar system showing the relative positions and sizes of planets.",
      files: [
        { name: "project_description.pdf", size: "1.2 MB" },
        { name: "solar_system_model.jpg", size: "3.5 MB" },
      ],
      feedback: [
        {
          from: "Ms. Johnson",
          role: "Teacher",
          text: "Excellent work on your solar system model!",
        },
      ],
    },
    {
      id: "2",
      title: "Community Service Documentation",
      child: "Emma",
      date: "April 8, 2025",
      status: "Under Review",
      description:
        "Documentation of a community service project focused on environmental cleanup.",
      files: [
        { name: "service_plan.pdf", size: "1.8 MB" },
        { name: "activity_photos.zip", size: "5.2 MB" },
      ],
      feedback: [],
    },
    {
      id: "3",
      title: "Recycled Art Project",
      child: "John",
      date: "March 15, 2025",
      status: "Approved",
      description:
        "Art created from recycled materials to promote environmental awareness.",
      files: [
        { name: "art_project.pdf", size: "1.5 MB" },
        { name: "recycled_art_photos.zip", size: "4.2 MB" },
      ],
      feedback: [
        {
          from: "Mr. Williams",
          role: "Teacher",
          text: "Your recycled art project demonstrates exceptional creativity.",
        },
        {
          from: "You",
          role: "Parent",
          text: "What a creative way to use recycled materials!",
        },
      ],
    },
  ];

  // Filter projects based on search term and child filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.child.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChild =
      childFilter === "all" ||
      project.child.toLowerCase() === childFilter.toLowerCase();
    return matchesSearch && matchesChild;
  });

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger a file download
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={childFilter} onValueChange={setChildFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              <SelectItem value="john">John</SelectItem>
              <SelectItem value="emma">Emma</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Projects ({filteredProjects.length})
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Under Review</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || childFilter !== "all"
                    ? "Try different search terms or filters"
                    : "Your children haven't submitted any projects yet"}
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
                        {project.child} - Submitted on {project.date}
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
                            <span className="sr-only">
                              Download {file.name}
                            </span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {project.feedback.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Feedback</h3>
                      <div className="space-y-2">
                        {project.feedback.map((item, index) => (
                          <div
                            key={index}
                            className="rounded-md border p-3 text-sm"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium">
                                {item.from}{" "}
                                <span className="text-xs text-muted-foreground">
                                  ({item.role})
                                </span>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Link
                      href={`/dashboard/parent/feedback?project=${
                        project.id
                      }&child=${project.child.toLowerCase()}`}
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
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          {filteredProjects.filter((p) => p.status === "Approved").length ===
          0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">
                  No approved projects found
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || childFilter !== "all"
                    ? "Try different search terms or filters"
                    : "No projects have been approved yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProjects
              .filter((p) => p.status === "Approved")
              .map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.child} - Submitted on {project.date}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="success"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={`/dashboard/parent/feedback?project=${
                          project.id
                        }&child=${project.child.toLowerCase()}`}
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
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {filteredProjects.filter((p) => p.status === "Under Review")
            .length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No pending projects found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || childFilter !== "all"
                    ? "Try different search terms or filters"
                    : "No projects are currently under review"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProjects
              .filter((p) => p.status === "Under Review")
              .map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.child} - Submitted on {project.date}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="warning"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        Under Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={`/dashboard/parent/feedback?project=${
                          project.id
                        }&child=${project.child.toLowerCase()}`}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
