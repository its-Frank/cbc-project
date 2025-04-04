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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Loader2, X } from "lucide-react";

export default function SubmitProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Mock tasks data - in a real app, this would come from an API
  const tasks = [
    { id: "1", name: "Solar System Model" },
    { id: "2", name: "Water Filtration System" },
    { id: "3", name: "Recycled Art Project" },
    { id: "4", name: "Community Service Documentation" },
    { id: "5", name: "Personal Finance Plan" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Update the handleSubmit function to show a better success message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!title || !description || !task || files.length === 0) {
        throw new Error(
          "Please fill in all fields and upload at least one file"
        );
      }

      // In a real app, this would be an API call to submit the project
      // const formData = new FormData()
      // formData.append("title", title)
      // formData.append("description", description)
      // formData.append("taskId", task)
      // files.forEach(file => formData.append("files", file))

      // const response = await fetch("/api/projects", {
      //   method: "POST",
      //   body: formData,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Project submitted successfully! 🎉",
        description:
          "Your project has been submitted for review. You'll receive feedback soon.",
        variant: "default",
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/student/projects");
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
        Submit New Project
      </h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill in the details of your project and upload any relevant files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task">Related Task</Label>
              <Select value={task} onValueChange={setTask} required>
                <SelectTrigger id="task">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, its objectives, and what you learned"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="files">Project Files</Label>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="files"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background p-4 text-sm text-muted-foreground hover:bg-accent/50"
                >
                  <FileUp className="mb-2 h-6 w-6" />
                  <span className="font-medium">Click to upload files</span>
                  <span className="text-xs">
                    Upload images, PDFs, documents, or other project files
                  </span>
                </Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium">Uploaded Files:</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2 text-sm"
                      >
                        <div className="flex items-center">
                          <span className="truncate max-w-[250px]">
                            {file.name}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
