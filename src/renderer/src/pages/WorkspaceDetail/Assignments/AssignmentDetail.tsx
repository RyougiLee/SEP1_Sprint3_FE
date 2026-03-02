import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Hooks
import { useStudentGetSubmission } from "@/hooks/useStudentGetSubmission";
import { useCreateSubmissionDraft } from "@/hooks/useCreateSubmissionDraft";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { useSubmitSubmissionDraft } from "@/hooks/useSubmitSubmissionDraft";
import { useGetAssignmentDetail } from "@/hooks/useGetAssignmentDetail";
import { useStudentGetGrade } from "@/hooks/useStudentGetGrade";

export function AssignmentDetail() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const user = useUserStore((state) => state.user);

  // API Hooks
  const { data: assignment, isLoading: isLoadingAssignment } : {data: any, isLoading: any} = useGetAssignmentDetail(assignmentId!);
  const { mutateAsync: getSubmission } = useStudentGetSubmission();
  const { mutateAsync: createDraft } = useCreateSubmissionDraft();
  const { mutateAsync: updateDescription } = useUpdateSubmission();
  const { mutateAsync: submitDraft } = useSubmitSubmissionDraft();
  const { mutateAsync: getGrade } = useStudentGetGrade();

  // Component State
  const [description, setDescription] = useState("");
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"UNSUBMITTED" | "DRAFT" | "SUBMITTED">("UNSUBMITTED");
  const [gradeInfo, setGradeInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initial Load: Fetch submission status and grade if applicable
  useEffect(() => {
    if (user?.role === "STUDENT" && assignmentId) {
      loadSubmissionData();
    }
  }, [assignmentId, user?.role]);

  const loadSubmissionData = async () => {
    try {
      const res: any = await getSubmission(assignmentId!);
      const submissions = res?.data || res;

      // The API returns an array; we consider the first entry
      if (Array.isArray(submissions) && submissions.length > 0) {
        const sub = submissions[0];
        setSubmissionId(sub.id.toString());
        setDescription(sub.description || "");
        setStatus(sub.status);

        // If the assignment is already submitted, attempt to fetch the grade
        if (sub.status === "SUBMITTED") {
          fetchGrade(sub.id.toString());
        }
      }
    } catch (error) {
      console.error("Failed to load submission data");
    }
  };

  const fetchGrade = async (subId: string) => {
    try {
      const res: any = await getGrade(subId);
      setGradeInfo(res?.data || res);
    } catch (error) {
      console.log("Grade not yet available for this submission.");
    }
  };

  const handleSave = async () => {
    if (!assignmentId) return;
    setIsProcessing(true);
    try {
      if (!submissionId) {
        // Step 1: Create a new draft if none exists
        const res: any = await createDraft({ assignmentId, discription: description });
        const data = res?.data || res;
        setSubmissionId(data.id.toString());
        setStatus("DRAFT");
        toast.success("Draft created successfully");
      } else {
        // Step 2: Update existing draft description
        await updateDescription({ submissionId, discription: description });
        toast.success("Changes saved to draft");
      }
    } catch (error) {
      toast.error("Failed to save draft");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Logic: Ensure the latest content is saved as a draft before calling the submit endpoint
      if (!submissionId) {
        const res: any = await createDraft({ assignmentId, discription: description });
        const data = res?.data || res;
        setSubmissionId(data.id.toString());
      } else {
        await updateDescription({ submissionId, discription: description });
      }

      // Final Step: Move submission from DRAFT to SUBMITTED status
      const submitRes: any = await submitDraft(assignmentId!);
      const submitData = submitRes?.data || submitRes;
      setStatus("SUBMITTED");
      toast.success("Assignment submitted successfully!");

      // Refresh to sync timestamps and status
      loadSubmissionData();
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingAssignment) return <div className="p-8">Loading assignment details...</div>;

  // TEACHER VIEW (Placeholder for future implementation)
  if (user?.role === "TEACHER") {
    return (
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">{assignment?.title} - Grading Center</h2>
          <div className="p-20 border-2 border-dashed rounded-xl text-center text-muted-foreground">
            Teacher Perspective: Submission list and grading interface will be implemented here.
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Assignment Info Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-3xl">{assignment?.title || "Untitled Assignment"}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Due Date: {assignment?.dueDate || "N/A"}
                </p>
              </div>
              <Badge variant={status === "SUBMITTED" ? "default" : "secondary"}>
                {status === "SUBMITTED" ? "Submitted" : status === "DRAFT" ? "Draft" : "Not Started"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed">
              {assignment?.description}
            </div>
          </CardContent>
        </Card>

        {/* Grade Feedback (Visible only after grading) */}
        {gradeInfo && (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center text-green-700">
                  Grade & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-600">{gradeInfo.score}</span>
                  <span className="text-sm text-muted-foreground">/ 10.0</span>
                </div>
                {gradeInfo.comments && (
                    <div className="text-sm bg-white/50 p-3 rounded border border-green-100">
                      <span className="font-semibold">Instructor Comments:</span> {gradeInfo.comments}
                    </div>
                )}
                <p className="text-[10px] text-muted-foreground pt-2">
                  Graded by {gradeInfo.gradedBy} on {new Date(gradeInfo.gradedAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
        )}

        {/* Submission Workspace */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
                placeholder="Enter your assignment description here..."
                className="min-h-[250px] text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end items-center space-x-4">
            <span className="text-xs text-muted-foreground">
              {status === "SUBMITTED" ? "Already submitted. You can update and resubmit if necessary." : "Drafts are not visible to instructors."}
            </span>
              <Button
                  variant="outline"
                  onClick={handleSave}
                  disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Save Draft"}
              </Button>
              <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || !description.trim()}
                  className={status === "SUBMITTED" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {isProcessing ? "Processing..." : status === "SUBMITTED" ? "Update & Resubmit" : "Submit Assignment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}