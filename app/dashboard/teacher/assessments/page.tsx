"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText, Search, SlidersHorizontal } from "lucide-react"

export default function TeacherAssessments() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in a real app, this would come from an API
  const pendingAssessments = [
    { id: "1", title: "Solar System Model", student: "John Student", date: "April 12, 2025", status: "pending" },
    { id: "2", title: "Water Filtration System", student: "Sarah Student", date: "April 10, 2025", status: "pending" },
    { id: "3", title: "Recycled Art Project", student: "Michael Student", date: "April 8, 2025", status: "pending" },
    {
      id: "4",
      title: "Community Service Documentation",
      student: "Emma Student",
      date: "April 5, 2025",
      status: "pending",
    },
    { id: "5", title: "Personal Finance Plan", student: "David Student", date: "April 3, 2025", status: "pending" },
  ]

  const completedAssessments = [
    { id: "6", title: "Local History Research", student: "Lisa Student", date: "March 28, 2025", status: "completed" },
    {
      id: "7",
      title: "Sustainable Energy Proposal",
      student: "James Student",
      date: "March 25, 2025",
      status: "completed",
    },
    { id: "8", title: "Digital Storytelling", student: "Sophia Student", date: "March 20, 2025", status: "completed" },
    { id: "9", title: "Nutrition Analysis", student: "Daniel Student", date: "March 15, 2025", status: "completed" },
    {
      id: "10",
      title: "Cultural Exchange Project",
      student: "Olivia Student",
      date: "March 10, 2025",
      status: "completed",
    },
  ]

  // Filter assessments based on search term
  const filteredPending = pendingAssessments.filter(
    (assessment) =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.student.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCompleted = completedAssessments.filter(
    (assessment) =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.student.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects or students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({filteredPending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filteredCompleted.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          {filteredPending.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No pending assessments found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "All projects have been assessed"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPending.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assessment.title}</CardTitle>
                      <CardDescription>{assessment.student}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Submitted on {assessment.date}</div>
                    <Link href={`/dashboard/teacher/assessments/${assessment.id}`}>
                      <Button>Assess Project</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {filteredCompleted.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No completed assessments found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "You haven't completed any assessments yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCompleted.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assessment.title}</CardTitle>
                      <CardDescription>{assessment.student}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Assessed on {assessment.date}</div>
                    <Link href={`/dashboard/teacher/assessments/${assessment.id}`}>
                      <Button variant="outline">View Assessment</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

