import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define proper types for our data
interface FeedbackFrom {
  name: string;
  role: string;
}

interface FeedbackItem {
  id: number;
  project: string;
  date: string;
  from: FeedbackFrom;
  message: string;
}

interface FeedbackByProject {
  [key: string]: FeedbackItem[];
}

export default function StudentFeedback() {
  // Mock feedback data
  const feedback: FeedbackItem[] = [
    {
      id: 1,
      project: "Solar System Model",
      date: "April 15, 2025",
      from: {
        name: "Ms. Johnson",
        role: "Teacher",
      },
      message:
        "Excellent work on your solar system model! Your attention to detail in representing the relative sizes and distances of the planets is impressive. The accompanying documentation clearly explains your research and process. Consider adding more information about the moons of Jupiter and Saturn in your next astronomy project.",
    },
    {
      id: 2,
      project: "Solar System Model",
      date: "April 16, 2025",
      from: {
        name: "Mr. Smith",
        role: "Parent",
      },
      message:
        "I'm very proud of your solar system project! The way you painted each planet with accurate details shows how much research you did. Great job explaining your work during our family presentation night.",
    },
    {
      id: 3,
      project: "Water Filtration System",
      date: "March 30, 2025",
      from: {
        name: "Ms. Johnson",
        role: "Teacher",
      },
      message:
        "Your water filtration system shows good understanding of the filtration process. The design is practical and your test results are well documented. To improve, consider exploring more sustainable materials and conducting more extensive water quality tests.",
    },
    {
      id: 4,
      project: "Recycled Art Project",
      date: "March 20, 2025",
      from: {
        name: "Mr. Williams",
        role: "Teacher",
      },
      message:
        "Your recycled art project demonstrates exceptional creativity and environmental awareness. The way you transformed everyday waste items into a meaningful art piece conveys a powerful message about sustainability. Your artist statement clearly articulates your intentions and process.",
    },
    {
      id: 5,
      project: "Recycled Art Project",
      date: "March 22, 2025",
      from: {
        name: "Mrs. Davis",
        role: "Parent",
      },
      message:
        "What a creative way to use recycled materials! I love how you turned things we would normally throw away into something beautiful. Your explanation of what each part represents shows how much thought you put into this.",
    },
  ];

  // Group feedback by project with proper typing
  const feedbackByProject: FeedbackByProject = feedback.reduce(
    (acc: FeedbackByProject, item) => {
      if (!acc[item.project]) {
        acc[item.project] = [];
      }
      acc[item.project].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
      </div>

      <div className="space-y-6">
        {Object.entries(feedbackByProject).map(([project, items]) => (
          <Card key={project}>
            <CardHeader>
              <CardTitle>{project}</CardTitle>
              <CardDescription>{items.length} feedback items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item: FeedbackItem) => (
                <div key={item.id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.from.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.from.role}</Badge>
                            <p className="text-xs text-muted-foreground">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
