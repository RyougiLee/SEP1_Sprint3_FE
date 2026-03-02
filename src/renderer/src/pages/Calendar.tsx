import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitleStore } from "@/store";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CalendarDays } from "lucide-react";

// Hook to fetch all assignments
import { useGetAllAssignments } from "@/hooks/useGetAllAssignments";

const Calendar = () => {
  const setTitle = useTitleStore((state) => state.setTitle);
  const navigate = useNavigate();

  // State: Currently selected date
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setTitle("Calendar Schedule");
  }, [setTitle]);

  // Fetch real data
  const { data: assignmentsRes, isLoading } = useGetAllAssignments();

  // Handle data structure: support direct array or data field wrapper
  const assignments = Array.isArray(assignmentsRes)
      ? assignmentsRes
      : (assignmentsRes as any)?.data || [];

  // Helper to compare dates (YYYY-MM-DD)
  const isSameDay = (date1: Date, date2Str: string) => {
    const d1 = new Date(date1).toISOString().split('T')[0];
    const d2 = new Date(date2Str).toISOString().split('T')[0];
    return d1 === d2;
  };

  // Filter assignments for the selected date
  const selectedAssignments = date
      ? assignments.filter((a: any) => isSameDay(date, a.dueDate))
      : [];

  // Calendar modifiers: Highlight days that have assignments
  const modifiers = {
    hasAssignment: (date: Date) =>
        assignments.some((a: any) => isSameDay(date, a.dueDate))
  };

  const modifiersStyles = {
    hasAssignment: {
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: 'hsl(var(--primary))'
    }
  };

  return (
      <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Left Side: Shadcn UI Calendar Component */}
          <Card className="md:col-span-5 lg:col-span-4 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-3">
              <CalendarUI
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
              />
            </CardContent>
          </Card>

          {/* Right Side: Assignment Details for Selected Date */}
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Schedule for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h2>
              <Badge variant="outline">
                {selectedAssignments.length} deadline(s)
              </Badge>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                  <p className="text-muted-foreground animate-pulse">Syncing data...</p>
              ) : selectedAssignments.length > 0 ? (
                  selectedAssignments.map((assignment: any) => (
                      <Card
                          key={assignment.id}
                          className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                          onClick={() => navigate(`/workspaces/${assignment.courseId}/assignments/${assignment.id}`)}
                      >
                        <div className="flex">
                          {/* Left decoration bar */}
                          <div className="w-1.5 bg-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                          <CardContent className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                {assignment.title}
                              </h3>
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                                {assignment.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                {assignment.courseName}
                              </div>
                              <div className="flex items-center text-orange-600 font-medium">
                                <Clock className="mr-2 h-4 w-4" />
                                Due: {new Date(assignment.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>

                            {assignment.description && (
                                <p className="mt-3 text-xs text-muted-foreground line-clamp-1 italic">
                                  "{assignment.description}"
                                </p>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                  ))
              ) : (
                  <Card className="border-dashed shadow-none py-12">
                    <CardContent className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="bg-muted rounded-full p-4 mb-4">
                        <CalendarDays className="h-8 w-8 opacity-20" />
                      </div>
                      <p>No assignments due on this date</p>
                      <Button variant="link" onClick={() => setDate(new Date())} className="mt-2">
                        Back to Today
                      </Button>
                    </CardContent>
                  </Card>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Calendar;