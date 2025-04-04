"use client";

import type React from "react";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ParentFeedback() {
  const [child, setChild] = useState("");
  const [project, setProject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Mock data - in a real app, this would come from an API
  const children = [
    { id: "1", name: "John" },
    { id: "2", name: "Emma" },
  ];

  const projects = [
    { id: "1", name: "Solar System Model", childId: "1" },
    { id: "2", name: "Water Filtration System", childId: "1" },
    { id: "3", name: "Recycled Art Project", childId: "1" },
    { id: "4", name: "Community Service Documentation", childId: "2" },
    { id: "5", name: "Personal Finance Plan", childId: "2" },
  ];

  // Filter projects based on selected child
  const filteredProjects = projects.filter((p) => p.childId === child);

  // Update the handleSubmit function to show a better success message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!child || !project || !feedback) {
        throw new Error("Please fill in all fields");
      }

      // In a real app, this would be an API call to submit the feedback
      // const response = await fetch("/api/feedback", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ childId: child, projectId: project, feedback }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Feedback submitted successfully! 🎉",
        description:
          "Your feedback has been submitted and will be visible to your child and their teacher.",
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/parent/projects");
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

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Provide Feedback
      </h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Project Feedback</CardTitle>
            <CardDescription>
              Provide encouraging feedback on your child's project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="child">Select Child</Label>
              <Select
                value={child}
                onValueChange={(value) => {
                  setChild(value);
                  setProject(""); // Reset project when child changes
                }}
                required
              >
                <SelectTrigger id="child">
                  <SelectValue placeholder="Select a child" />
                </SelectTrigger>
                <SelectContent>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Select Project</Label>
              <Select
                value={project}
                onValueChange={setProject}
                required
                disabled={!child}
              >
                <SelectTrigger id="project">
                  <SelectValue
                    placeholder={
                      child ? "Select a project" : "Select a child first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {filteredProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide encouraging feedback on your child's project..."
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Note: As a parent, your feedback is meant to encourage and
                support, not to assess competencies.
              </p>
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
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
