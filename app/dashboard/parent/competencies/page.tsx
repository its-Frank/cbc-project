"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Award } from "lucide-react";

export default function ParentCompetencies() {
  const [childFilter, setChildFilter] = useState("all");

  // Mock competency data
  const competencies = [
    {
      child: "John",
      competencies: [
        {
          name: "Communication",
          score: 85,
          description: "Ability to express ideas clearly and effectively",
        },
        {
          name: "Collaboration",
          score: 90,
          description: "Ability to work effectively with others",
        },
        {
          name: "Critical Thinking",
          score: 78,
          description: "Ability to analyze and evaluate information",
        },
        {
          name: "Creativity",
          score: 92,
          description: "Ability to generate innovative ideas and solutions",
        },
      ],
      projects: [
        {
          name: "Solar System Model",
          scores: {
            Communication: 90,
            "Critical Thinking": 85,
            Creativity: 88,
          },
        },
        {
          name: "Recycled Art Project",
          scores: { Communication: 80, Collaboration: 90, Creativity: 95 },
        },
      ],
    },
    {
      child: "Emma",
      competencies: [
        {
          name: "Communication",
          score: 78,
          description: "Ability to express ideas clearly and effectively",
        },
        {
          name: "Collaboration",
          score: 85,
          description: "Ability to work effectively with others",
        },
        {
          name: "Critical Thinking",
          score: 82,
          description: "Ability to analyze and evaluate information",
        },
        {
          name: "Creativity",
          score: 92,
          description: "Ability to generate innovative ideas and solutions",
        },
      ],
      projects: [
        {
          name: "Community Service Documentation",
          scores: {
            Communication: 78,
            Collaboration: 85,
            "Critical Thinking": 82,
          },
        },
      ],
    },
  ];

  // Filter competencies based on child filter
  const filteredCompetencies =
    childFilter === "all"
      ? competencies
      : competencies.filter(
          (c) => c.child.toLowerCase() === childFilter.toLowerCase()
        );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Competency Progress
        </h1>
        <Select value={childFilter} onValueChange={setChildFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select child" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Children</SelectItem>
            <SelectItem value="john">John</SelectItem>
            <SelectItem value="emma">Emma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredCompetencies.map((child) =>
          child.competencies.map((comp) => (
            <Card key={`${child.child}-${comp.name}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {child.child} - {comp.name}
                </CardTitle>
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
          ))
        )}
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details">Competency Details</TabsTrigger>
          <TabsTrigger value="projects">Projects Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6 mt-6">
          {filteredCompetencies.map((child) => (
            <Card key={`${child.child}-details`}>
              <CardHeader>
                <CardTitle>{child.child}'s Competency Details</CardTitle>
                <CardDescription>
                  Detailed breakdown of competency assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {child.competencies.map((comp) => (
                    <div key={comp.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">{comp.name}</h3>
                        <span className="text-sm font-medium">
                          {comp.score}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {comp.description}
                      </p>
                      <div className="h-2 w-full rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          {comp.score >= 90
                            ? "Exemplary"
                            : comp.score >= 80
                            ? "Proficient"
                            : comp.score >= 70
                            ? "Developing"
                            : "Emerging"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="projects" className="space-y-6 mt-6">
          {filteredCompetencies.map((child) => (
            <Card key={`${child.child}-projects`}>
              <CardHeader>
                <CardTitle>{child.child}'s Project Assessments</CardTitle>
                <CardDescription>
                  Competency scores across different projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {child.projects.map((project) => (
                    <div key={project.name} className="space-y-4">
                      <h3 className="text-base font-medium flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        {project.name}
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(project.scores).map(
                          ([competency, score]) => (
                            <div key={competency} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">{competency}</div>
                                <div className="text-muted-foreground">
                                  {score}%
                                </div>
                              </div>
                              <div className="h-2 w-full rounded-full bg-primary/10">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          )
                        )}
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
