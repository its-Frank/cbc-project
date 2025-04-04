import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, FileText, PlusCircle, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <Link href="/dashboard/teacher/tasks/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Across 2 classes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 due this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">8 submitted in the last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assessments</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">Completed this term</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Solar System Model</p>
                      <p className="text-sm text-muted-foreground">John Student - Submitted on April 12, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Water Filtration System</p>
                      <p className="text-sm text-muted-foreground">Sarah Student - Submitted on April 10, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Recycled Art Project</p>
                      <p className="text-sm text-muted-foreground">Michael Student - Submitted on April 8, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>Average competency scores across classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Communication</div>
                      <div className="text-muted-foreground">78%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[78%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Collaboration</div>
                      <div className="text-muted-foreground">85%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[85%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Critical Thinking</div>
                      <div className="text-muted-foreground">72%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[72%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Creativity</div>
                      <div className="text-muted-foreground">88%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[88%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <CardDescription>View and manage all tasks you've assigned to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Task list would go here */}
                <p className="text-sm text-muted-foreground">Manage all your tasks in detail on the Tasks page</p>
                <Link href="/dashboard/teacher/tasks">
                  <Button variant="outline">View All Tasks</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assessments</CardTitle>
              <CardDescription>Review and assess student project submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Assessment list would go here */}
                <p className="text-sm text-muted-foreground">View all pending assessments on the Assessments page</p>
                <Link href="/dashboard/teacher/assessments">
                  <Button variant="outline">View All Assessments</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Track student competency development and project completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Student list would go here */}
                <p className="text-sm text-muted-foreground">View detailed student progress on the Students page</p>
                <Link href="/dashboard/teacher/students">
                  <Button variant="outline">View All Students</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

