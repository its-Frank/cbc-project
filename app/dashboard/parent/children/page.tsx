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
import { Search, User, FileText, BarChart, MessageSquare } from "lucide-react";

export default function ParentChildren() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for children
  const children = [
    {
      id: "1",
      name: "John",
      grade: "8",
      age: 14,
      projects: 3,
      competencies: {
        communication: 85,
        collaboration: 90,
        criticalThinking: 78,
        creativity: 92,
      },
      teacher: "Ms. Johnson",
      recentActivity: "Submitted Solar System Model project on April 12, 2025",
    },
    {
      id: "2",
      name: "Emma",
      grade: "6",
      age: 12,
      projects: 2,
      competencies: {
        communication: 78,
        collaboration: 85,
        criticalThinking: 82,
        creativity: 92,
      },
      teacher: "Mr. Williams",
      recentActivity:
        "Submitted Community Service Documentation on April 8, 2025",
    },
  ];

  // Filter children based on search term
  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate average competency score for each child
  const getAverageScore = (competencies: Record<string, number>) => {
    const values = Object.values(competencies);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search children..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Information</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {filteredChildren.map((child) => (
            <Card key={child.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>Grade {child.grade}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {getAverageScore(child.competencies).toFixed(0)}% Avg
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Recent Activity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {child.recentActivity}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Teacher</h3>
                    <p className="text-sm text-muted-foreground">
                      {child.teacher}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-2">
                      Competency Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(child.competencies).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span>{value}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-primary/10">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Link
                    href={`/dashboard/parent/children/${child.id}/projects`}
                  >
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Projects
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/parent/children/${child.id}/competencies`}
                  >
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-1" />
                      Competencies
                    </Button>
                  </Link>
                  <Link href={`/dashboard/parent/feedback?child=${child.id}`}>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Provide Feedback
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="details" className="space-y-4">
          {filteredChildren.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>Detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{child.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Grade:</span>
                      <span className="text-sm">{child.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Age:</span>
                      <span className="text-sm">{child.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Teacher:</span>
                      <span className="text-sm">{child.teacher}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Projects Submitted:
                      </span>
                      <span className="text-sm">{child.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Average Competency:
                      </span>
                      <span className="text-sm">
                        {getAverageScore(child.competencies).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Recent Activity:
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {child.recentActivity}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
