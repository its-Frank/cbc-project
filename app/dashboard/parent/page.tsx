import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, FileText, MessageSquare, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ParentDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
        <Link href="/dashboard/parent/feedback">
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Provide Feedback
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="children">My Children</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Children</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Registered in the system</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Projects</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Submitted in the last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">On various projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
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
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Solar System Model</p>
                      <p className="text-sm text-muted-foreground">John - Submitted on April 12, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Community Service Documentation</p>
                      <p className="text-sm text-muted-foreground">Emma - Submitted on April 8, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Recycled Art Project</p>
                      <p className="text-sm text-muted-foreground">John - Submitted on March 15, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Competency Progress</CardTitle>
                <CardDescription>Your children's progress across CBC competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">John - Communication</div>
                      <div className="text-muted-foreground">85%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[85%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Emma - Communication</div>
                      <div className="text-muted-foreground">78%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[78%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">John - Critical Thinking</div>
                      <div className="text-muted-foreground">78%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[78%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Emma - Creativity</div>
                      <div className="text-muted-foreground">92%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-full w-[92%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="children" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Children</CardTitle>
              <CardDescription>View and manage your children's profiles and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Children list would go here */}
                <p className="text-sm text-muted-foreground">
                  View detailed information about your children on the My Children page
                </p>
                <Link href="/dashboard/parent/children">
                  <Button variant="outline">View Children Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>View your children's projects and provide feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Projects list would go here */}
                <p className="text-sm text-muted-foreground">
                  View all projects submitted by your children on the Projects page
                </p>
                <Link href="/dashboard/parent/projects">
                  <Button variant="outline">View All Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="competencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competency Progress</CardTitle>
              <CardDescription>Track your children's progress across CBC competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Competency details would go here */}
                <p className="text-sm text-muted-foreground">
                  View detailed competency assessments on the Competencies page
                </p>
                <Link href="/dashboard/parent/competencies">
                  <Button variant="outline">View Competency Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

