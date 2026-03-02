import React, { useEffect } from "react";
import { useTitleStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Info, Users, Code, Server, ShieldCheck, LayoutDashboard} from "lucide-react";

const About = () => {
  const setTitle = useTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("About Project");
  }, [setTitle]);

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <Info className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Assignment Submission System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined platform for academic management, designed and developed by <strong>Group 5</strong>.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Identity */}
          <Card className="border-none shadow-md bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Users className="mr-2 w-5 h-5" />
                The Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This project is the collective effort of <strong>Group 5</strong>. Our mission was to bridge the gap between students and teachers through a clean, efficient, and user-friendly digital workspace.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Frontend Engineering</Badge>
                <Badge variant="secondary">Backend Architecture</Badge>
                <Badge variant="secondary">UI/UX Design</Badge>
                <Badge variant="secondary">Database Management</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Code className="mr-2 w-5 h-5" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-blue-100 rounded">
                  <LayoutDashboard className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Frontend</p>
                  <p className="text-xs text-muted-foreground">React, TypeScript, Tailwind CSS, Shadcn UI</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-green-100 rounded">
                  <Server className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Backend</p>
                  <p className="text-xs text-muted-foreground">Spring Boot, Hibernate, Java</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-purple-100 rounded">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Database</p>
                  <p className="text-xs text-muted-foreground">MairaDB / MySQL with JPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Vision */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-2 bg-primary" />
          <CardHeader>
            <CardTitle>Project Goals</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
            <p>
              The Assignment Submission System was built to simplify the academic workflow. Key features include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Secure student submission management for assignments.</li>
              <li>Teacher-focused grading tools with feedback capabilities.</li>
              <li>Real-time academic calendars to track upcoming deadlines.</li>
              <li>Personalized dashboards for different user roles.</li>
            </ul>
          </CardContent>
        </Card>

        <footer className="text-center py-6 border-t text-sm text-muted-foreground">
          © 2026 Group 5 Project. Built with dedication and curiosity.
        </footer>
      </div>
  );
};

export default About;