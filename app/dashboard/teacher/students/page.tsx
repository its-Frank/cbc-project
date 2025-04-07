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
  User,
  BarChart,
  FileText,
} from "lucide-react";

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in a real app, this would come from an API
  const students = [
    {
      id: "1",
      name: "John Student",
      grade: "8",
      projects: 3,
      competencies: {
        communication: 85,
        collaboration: 90,
        criticalThinking: 78,
        creativity: 92,
      },
    },
    {
      id: "2",
      name: "Sarah Student",
      grade: "8",
      projects: 2,
      competencies: {
        communication: 92,
        collaboration: 85,
        criticalThinking: 88,
        creativity: 80,
      },
    },
    {
      id: "3",
      name: "Michael Student",
      grade: "8",
      projects: 3,
      competencies: {
        communication: 75,
        collaboration: 82,
        criticalThinking: 90,
        creativity: 85,
      },
    },
    {
      id: "4",
      name: "Emma Student",
      grade: "8",
      projects: 2,
      competencies: {
        communication: 88,
        collaboration: 95,
        criticalThinking: 82,
        creativity: 90,
      },
    },
    {
      id: "5",
      name: "David Student",
      grade: "8",
      projects: 1,
      competencies: {
        communication: 80,
        collaboration: 75,
        criticalThinking: 85,
        creativity: 78,
      },
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate average competency score for each student
  const getAverageScore = (competencies: Record<string, number>) => {
    const values = Object.values(competencies);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <Button variant="outline">
          <BarChart className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Students ({filteredStudents.length})
          </TabsTrigger>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="competencies">Competency Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <User className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No students found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm
                    ? "Try a different search term"
                    : "No students are currently assigned to you"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription>Grade {student.grade}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {getAverageScore(student.competencies).toFixed(0)}% Avg
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {student.projects}
                      </span>{" "}
                      projects submitted
                    </div>
                    <Link href={`/dashboard/teacher/students/${student.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Students with ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Grade {student.grade}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{student.projects} Active</Badge>
                      <Link
                        href={`/dashboard/teacher/students/${student.id}/projects`}
                      >
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="competencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competency Tracking</CardTitle>
              <CardDescription>
                Student progress across CBC competencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{student.name}</p>
                      <Link
                        href={`/dashboard/teacher/students/${student.id}/competencies`}
                      >
                        <Button variant="ghost" size="sm">
                          <BarChart className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Communication</span>
                          <span>{student.competencies.communication}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${student.competencies.communication}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Collaboration</span>
                          <span>{student.competencies.collaboration}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${student.competencies.collaboration}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Critical Thinking</span>
                          <span>{student.competencies.criticalThinking}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${student.competencies.criticalThinking}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Creativity</span>
                          <span>{student.competencies.creativity}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${student.competencies.creativity}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
