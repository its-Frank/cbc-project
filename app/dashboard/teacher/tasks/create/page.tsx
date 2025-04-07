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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Import useAuth hook at the top of the file
import { useAuth } from "@/hooks/use-auth";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  // Update the handleSubmit function with better error handling and debugging
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(null);

    try {
      // Validate form
      if (!taskName || !taskDescription || !dueDate) {
        throw new Error("Please fill in all fields");
      }

      // Check if user is authenticated
      if (!user) {
        throw new Error("You must be logged in to create a task");
      }

      // Debug information
      console.log("Creating task with user:", user);

      // Create a direct API call to the backend
      const taskData = {
        taskName,
        taskDescription,
        dueDate,
      };

      // Log the request data
      console.log("Sending task data:", taskData);

      // Try the Next.js API route first
      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(taskData),
        });

        // Log the response
        console.log("API response status:", response.status);

        // If the response is not ok, try the direct backend route
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Next.js API error response:", errorText);

          // Try to parse as JSON if possible
          let errorData = {};
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            // Not JSON, use as is
          }

          setDebugInfo({
            endpoint: "/api/tasks",
            status: response.status,
            response: errorData || errorText,
          });

          throw new Error(
            errorData.error ||
              `Failed to create task (Status: ${response.status})`
          );
        }

        const data = await response.json();
        console.log("Task created successfully:", data);

        toast({
          title: "Task created successfully! 🎉",
          description:
            "Your new task has been created and is now available to students.",
        });

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard/teacher/tasks");
        }, 2000);
      } catch (apiError) {
        console.error(
          "Next.js API route failed, trying direct backend:",
          apiError
        );

        // Try the direct backend route as fallback
        const backendResponse = await fetch("/api/direct-backend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            endpoint: "/tasks",
            method: "POST",
            data: taskData,
          }),
        });

        if (!backendResponse.ok) {
          const errorText = await backendResponse.text();
          console.error("Backend API error response:", errorText);

          // Try to parse as JSON if possible
          let errorData = {};
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            // Not JSON, use as is
          }

          setDebugInfo({
            endpoint: "/api/direct-backend",
            status: backendResponse.status,
            response: errorData || errorText,
          });

          throw new Error(
            errorData.error ||
              `Failed to create task (Status: ${backendResponse.status})`
          );
        }

        const data = await backendResponse.json();
        console.log("Task created successfully via direct backend:", data);

        toast({
          title: "Task created successfully! 🎉",
          description:
            "Your new task has been created and is now available to students.",
        });

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard/teacher/tasks");
        }, 2000);
      }
    } catch (error) {
      console.error("Task creation error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      toast({
        title: "Task creation failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for the min attribute of the date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
      </div>

      {/* Debug information */}
      {process.env.NODE_ENV !== "production" && (
        <div className="mb-6">
          <div className="p-4 bg-gray-100 border rounded mb-4">
            <h3 className="font-bold">Debug User Info</h3>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          {debugInfo && (
            <div className="p-4 bg-gray-100 border rounded">
              <h3 className="font-bold">API Debug Info</h3>
              <pre className="text-xs mt-2 overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>
              Create a new task for your students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskName">Task Name</Label>
              <Input
                id="taskName"
                placeholder="Enter a name for the task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dueDate"
                  type="date"
                  className="pl-10"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={tomorrowFormatted}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taskDescription">Task Description</Label>
              <Textarea
                id="taskDescription"
                placeholder="Provide detailed instructions for the task"
                rows={5}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
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
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
