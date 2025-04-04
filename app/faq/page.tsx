"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>("item-1")

  const faqs = [
    {
      id: "item-1",
      question: "What is CBC-EDU Triad?",
      answer:
        "CBC-EDU Triad is a comprehensive platform designed to enhance the implementation of the Competency-Based Curriculum (CBC) in Kenya. It connects students, teachers, and parents in a collaborative ecosystem for project showcasing and competency tracking.",
    },
    {
      id: "item-2",
      question: "How does the platform benefit students?",
      answer:
        "Students can showcase their innovation projects, receive feedback from teachers and parents, track their competency development, and maintain a portfolio of their work throughout their educational journey.",
    },
    {
      id: "item-3",
      question: "What features are available for teachers?",
      answer:
        "Teachers can create and assign tasks, assess student projects using standardized rubrics, track student progress across different competencies, provide feedback, and generate reports on student performance.",
    },
    {
      id: "item-4",
      question: "How can parents engage with the platform?",
      answer:
        "Parents can view their children's projects, track their competency development, provide encouraging feedback, and stay connected with teachers regarding their children's educational progress.",
    },
    {
      id: "item-5",
      question: "What competencies are tracked on the platform?",
      answer:
        "The platform tracks key CBC competencies including Communication, Collaboration, Critical Thinking, Creativity, and Digital Literacy, with detailed criteria and performance levels for each.",
    },
    {
      id: "item-6",
      question: "Is the platform secure?",
      answer:
        "Yes, CBC-EDU Triad is built with security as a priority. We implement role-based access control, secure authentication, data encryption, and regular security audits to protect user data.",
    },
    {
      id: "item-7",
      question: "How do I get started with CBC-EDU Triad?",
      answer:
        "You can register for an account on our platform by clicking the 'Register' button and selecting your role (student, teacher, or parent). Once registered, you'll have access to features specific to your role.",
    },
    {
      id: "item-8",
      question: "Is technical support available?",
      answer:
        "Yes, we provide technical support through our help center, email support, and during regular office hours. You can contact us at support@cbcedutriad.com for assistance.",
    },
  ]

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
                  Frequently Asked Questions
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find answers to common questions about CBC-EDU Triad
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <Accordion
              type="single"
              collapsible
              value={openItem || undefined}
              onValueChange={(value) => setOpenItem(value)}
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-500 dark:text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                If you couldn't find the answer to your question, please feel free to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto text-center"
                >
                  Contact Support
                </a>
                <a
                  href="/help"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto text-center"
                >
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

