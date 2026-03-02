import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitleStore, useUserStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ChevronRight, GraduationCap, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Hooks
import { useMyCourses } from "@/hooks/useMyCourses";
import { useGetUrgentAssignments } from "@/hooks/useGetUrgentAssignments";

const Home = () => {
  const setTitle = useTitleStore((state) => state.setTitle);
  const user: any = useUserStore((state) => state.user);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  if (!user) {
    return <div className="p-8">Loading user data...</div>;
  }

  return (
      <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user.full_name || user.username}!
            </h1>
            <p className="text-muted-foreground">
              {user.role === "TEACHER"
                  ? "Here is your teaching overview."
                  : "Here is your learning overview."}
            </p>
          </div>
        </div>

        {/* Role-based Dashboard Content */}
        {user.role === "TEACHER" ? (
            <TeacherDashboard user={user} />
        ) : (
            <StudentDashboard userId={user.id} />
        )}
      </div>
  );
};

// ---------------------------------------------------------------------------
// TEACHER DASHBOARD
// ---------------------------------------------------------------------------
function TeacherDashboard({ user }: { user: any }) {
  const navigate = useNavigate();

  return (
      <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-10 text-center space-y-6">
          <GraduationCap className="w-16 h-16 mx-auto text-blue-500 opacity-80" />
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Have a great day of teaching, Professor {user.full_name || user.username}.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              You can manage all your classes, create new assignments, and grade student submissions in your workspaces.
            </p>
          </div>
          <Button size="lg" onClick={() => navigate("/workspaces")} className="mt-4">
            Go to My Workspaces <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
  );
}

// ---------------------------------------------------------------------------
// STUDENT DASHBOARD
// ---------------------------------------------------------------------------
function StudentDashboard({ userId }: { userId: number }) {
  const navigate = useNavigate();

  // Fetch real data using hooks
  const { data: coursesRes, isLoading: coursesLoading } = useMyCourses(userId);
  const { data: assignmentsRes, isLoading: assignmentsLoading } = useGetUrgentAssignments();

  const courses = Array.isArray(coursesRes) ? coursesRes : (coursesRes as any)?.data || [];
  const assignments = Array.isArray(assignmentsRes) ? assignmentsRes : (assignmentsRes as any)?.data || [];

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column: Enrolled Courses */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              My Courses
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/workspaces")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coursesLoading ? (
                <div className="col-span-2 p-8 text-center text-muted-foreground">Loading courses...</div>
            ) : courses.length > 0 ? (
                courses.slice(0, 4).map((item: any) => {
                  // Extraction logic depends on whether API returns pure Course list or Enrollment list
                  const course = item.course || item;
                  console.log("test",course)
                  return (
                      <Card
                          key={course.courseId}
                          className="hover:shadow-md transition-shadow cursor-pointer group"
                          onClick={() => navigate(`/workspaces/${course.courseId}`)}
                      >
                        <CardHeader className="pb-3">
                          <Badge variant="outline" className="w-fit bg-blue-50 text-blue-700 border-blue-200">
                            {course.courseCode || course.course_code || "COURSE"}
                          </Badge>
                          <CardTitle className="text-lg mt-2 group-hover:text-blue-600 transition-colors">
                            {course.courseName || course.course_name}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                  );
                })
            ) : (
                <div className="col-span-2 p-8 border border-dashed rounded-lg text-center text-muted-foreground">
                  You are not currently enrolled in any courses.
                </div>
            )}
          </div>
        </div>

        {/* Right Column: Urgent Assignments */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            Urgent Deadlines
          </h2>

          <Card>
            <CardContent className="p-0 divide-y">
              {assignmentsLoading ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
              ) : assignments.length > 0 ? (
                  assignments.map((assignment: any) => (
                      <div
                          key={assignment.id}
                          className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col gap-2"
                          onClick={() => navigate(`/workspaces/${assignment.courseId}/assignments/${assignment.id}`)}
                      >
                        <div className="flex justify-between items-start">
                    <span className="font-medium text-sm line-clamp-2">
                      {assignment.title}
                    </span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-orange-50 text-orange-700 border-orange-200">
                            {assignment.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span className="truncate max-w-[140px]">{assignment.courseName}</span>
                          <span className="flex items-center text-orange-600 font-medium">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No urgent assignments! 🎉
                  </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
  );
}

export default Home;