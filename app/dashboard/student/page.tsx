"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  PlusCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const [projects, setProjects] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Always set mock data first as a fallback
        setProjects(mockProjects);
        setCompetencies(mockCompetencies);

        // Try to fetch real data if API is ready
        try {
          // Fetch projects
          const projectsResponse = await fetch(`/api/projects`, {
            credentials: "include",
          });

          if (projectsResponse.ok) {
            const projectsData = await projectsResponse.json();
            if (projectsData.projects && projectsData.projects.length > 0) {
              setProjects(projectsData.projects);
            }
          }

          // Fetch competencies
          if (user) {
            const studentId = user.id; // This would need to be the actual student ID
            const competenciesResponse = await fetch(
              `/api/competencies/progress/${studentId}`,
              {
                credentials: "include",
              }
            );

            if (competenciesResponse.ok) {
              const competenciesData = await competenciesResponse.json();
              if (
                competenciesData.progress &&
                competenciesData.progress.length > 0
              ) {
                setCompetencies(competenciesData.progress);
              }
            }
          }
        } catch (apiError) {
          // Silently fail API calls during development
          console.log("API not ready yet, using mock data instead");
          // No need to show error toast during development
        }
      } catch (error) {
        console.error("Error in dashboard setup:", error);
        toast({
          title: "Error",
          description:
            "Failed to load dashboard data. Using sample data instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  // Mock data for development
  const mockProjects = [
    {
      id: 1,
      title: "Solar System Model",
      date: "April 12, 2025",
      status: "Approved",
    },
    {
      id: 2,
      title: "Water Filtration System",
      date: "March 28, 2025",
      status: "Under Review",
    },
    {
      id: 3,
      title: "Recycled Art Project",
      date: "March 15, 2025",
      status: "Approved",
    },
  ];

  const mockCompetencies = [
    { CompetencyName: "Communication", PercentageScore: 85 },
    { CompetencyName: "Collaboration", PercentageScore: 92 },
    { CompetencyName: "Critical Thinking", PercentageScore: 78 },
    { CompetencyName: "Creativity", PercentageScore: 90 },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;
  const displayCompetencies =
    competencies.length > 0 ? competencies : mockCompetencies;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <Link href="/dashboard/student/submit">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Submit New Project
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {displayProjects.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    displayProjects.filter((p) => p.status === "Approved")
                      .length
                  }{" "}
                  approved,{" "}
                  {
                    displayProjects.filter((p) => p.status === "Under Review")
                      .length
                  }{" "}
                  pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Due in the next 7 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Competencies
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/5</div>
                <p className="text-xs text-muted-foreground">
                  80% proficiency achieved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  8 from teachers, 4 from parents
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {project.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {project.date}
                        </p>
                      </div>
                      <div className="ml-auto flex h-8 items-center">
                        {project.status === "Approved" ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="ml-1 text-xs text-muted-foreground">
                              Approved
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="ml-1 text-xs text-muted-foreground">
                              Under Review
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Competency Progress</CardTitle>
                <CardDescription>
                  Your progress across CBC competencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayCompetencies.map((comp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">{comp.CompetencyName}</div>
                        <div className="text-muted-foreground">
                          {comp.PercentageScore}%
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${comp.PercentageScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>
                View and manage all your submitted projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Project list would go here */}
                <p className="text-sm text-muted-foreground">
                  View all your projects in detail on the Projects page
                </p>
                <Link href="/dashboard/student/projects">
                  <Button variant="outline">View All Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="competencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competency Tracking</CardTitle>
              <CardDescription>
                Track your progress across CBC competencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Competency details would go here */}
                <p className="text-sm text-muted-foreground">
                  View detailed competency assessments on the Competencies page
                </p>
                <Link href="/dashboard/student/competencies">
                  <Button variant="outline">View Competency Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
