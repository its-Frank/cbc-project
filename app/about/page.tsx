import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { BookOpen, Award, Users, School, Target } from "lucide-react"

export default function AboutPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About CBC-EDU Triad</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Empowering students, teachers, and parents through innovative project showcasing and competency
                  tracking
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  CBC-EDU Triad is dedicated to enhancing the implementation of the Competency-Based Curriculum (CBC) in
                  Kenya by providing a comprehensive platform that connects the three key stakeholders in education:
                  students, teachers, and parents.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Our mission is to create a collaborative ecosystem where students can showcase their innovation
                  projects, teachers can effectively assess competencies, and parents can actively participate in their
                  children's educational journey.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Award className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium">Excellence</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Users className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium">Collaboration</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <School className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium">Education</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Target className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium">Innovation</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold">Our Story</h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 p-6 border rounded-lg bg-white dark:bg-gray-950">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">The Beginning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CBC-EDU Triad was founded in 2023 by a team of educators and technologists at Wami School who
                  recognized the need for a better way to implement the Competency-Based Curriculum.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 border rounded-lg bg-white dark:bg-gray-950">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Growth</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  What started as a simple project tracking tool has evolved into a comprehensive platform that
                  addresses the needs of all stakeholders in the educational ecosystem.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 border rounded-lg bg-white dark:bg-gray-950">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Today</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Today, CBC-EDU Triad serves thousands of students, teachers, and parents across Kenya, helping to
                  improve educational outcomes through better competency tracking and project showcasing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold">Our Team</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Meet the dedicated professionals behind CBC-EDU Triad
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img
                      alt={`Team Member ${i}`}
                      src={`/placeholder.svg?height=96&width=96`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium">Team Member {i}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

