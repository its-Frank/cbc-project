import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Brain,
  Users,
  CheckCircle,
  BarChart3,
  Shield,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <MainNav />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Platform Features
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover how CBC-EDU Triad enhances the educational experience
                  for students, teachers, and parents
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Project Showcase</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Students can upload and showcase their innovation projects for
                  review and feedback. The platform provides a structured way to
                  document project details, upload files, and track progress.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Competency Tracking</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Track and assess student competencies across multiple
                  dimensions including Communication, Collaboration, Critical
                  Thinking, and Creativity with detailed rubrics and performance
                  levels.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Stakeholder Engagement</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect teachers, students, and parents in a collaborative
                  educational ecosystem. Each stakeholder has a dedicated
                  dashboard with role-specific features and insights.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Assessment Tools</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Teachers can assess projects using standardized rubrics
                  aligned with CBC competencies, providing consistent and fair
                  evaluations across all student work.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Progress Visualization</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Visual dashboards and reports help track student progress over
                  time, identifying strengths and areas for improvement across
                  different competencies.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Secure Platform</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Built with security in mind, the platform ensures that student
                  data is protected and accessible only to authorized users with
                  role-based permissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-6">For Students</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Project Submission</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Upload project details, descriptions, and files for
                        teacher review and assessment.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Competency Dashboard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Track your progress across different competencies with
                        visual indicators and detailed breakdowns.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Feedback Access</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Receive and review feedback from teachers and parents to
                        improve future projects.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">For Teachers</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Task Management</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Create and assign tasks with detailed descriptions and
                        due dates for students.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Assessment Tools</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Evaluate student projects using standardized rubrics
                        aligned with CBC competencies.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Progress Tracking</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Monitor student progress across different competencies
                        and generate reports.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">For Parents</h2>
              <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Project Visibility</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      View your children's projects and track their submission
                      status and assessments.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Feedback Provision</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Provide encouraging feedback on your children's projects
                      to support their learning journey.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Competency Insights</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Gain insights into your children's competency development
                      and areas for improvement.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Communication Channel</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Stay connected with teachers and engage in your children's
                      educational journey.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
