import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useStudentGetSubmission } from "@/hooks/useStudentGetSubmission";
import { useCreateSubmissionDraft } from "@/hooks/useCreateSubmissionDraft";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { useSubmitSubmissionDraft } from "@/hooks/useSubmitSubmissionDraft";
import { useGetAssignmentDetail } from "@/hooks/useGetAssignmentDetail";
import { useStudentGetGrade } from "@/hooks/useStudentGetGrade";
import { useTeacherGetSubmission } from "@/hooks/useTeacherGetSubmission";
import { useGetSingleSubmission } from "@/hooks/useGetSingleSubmission";
import { useGradeSubmission } from "@/hooks/useGradeSubmission";
import { useUpdateGrade } from "@/hooks/useUpdateGrade";

export function AssignmentDetail() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const user = useUserStore((state) => state.user);
  const { data: assignment, isLoading: isLoadingAssignment } = useGetAssignmentDetail(assignmentId!);

  if (isLoadingAssignment) return <div className="p-8">Loading assignment details...</div>;

  if (user?.role === "TEACHER") {
    return <TeacherAssignmentView assignmentId={assignmentId!} assignment={assignment} />;
  }

  return <StudentAssignmentView assignmentId={assignmentId!} assignment={assignment} />;
}

// ---------------------------------------------------------------------------
// TEACHER VIEW COMPONENT
// ---------------------------------------------------------------------------
function TeacherAssignmentView({ assignmentId, assignment }: { assignmentId: string; assignment: any }) {
  const { mutateAsync: getSubmissionsMutate } = useTeacherGetSubmission();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res: any = await getSubmissionsMutate(assignmentId);
      setSubmissions(res?.data || res || []);
    } catch (error) {
      toast.error("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (assignmentId) fetchSubmissions();
  }, [assignmentId]);

  const handleOpenGrading = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsDialogOpen(true);
  };

  const handleCloseGrading = () => {
    setIsDialogOpen(false);
    setSelectedSubmissionId(null);
    fetchSubmissions(); // Refresh list after grading
  };

  return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{assignment?.title} - Submissions</CardTitle>
            <p className="text-sm text-muted-foreground">Review and grade student submissions here.</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
                    </TableRow>
                ) : submissions.map((sub: any) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.studentUsername}</TableCell>
                      <TableCell>
                        <Badge variant={sub.status === "SUBMITTED" ? "default" : "secondary"}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "Not submitted"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenGrading(sub.id.toString())}
                        >
                          View & Grade
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
                {!isLoading && submissions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {isDialogOpen && selectedSubmissionId && (
            <GradingDialog
                submissionId={selectedSubmissionId}
                onClose={handleCloseGrading}
            />
        )}
      </div>
  );
}

// ---------------------------------------------------------------------------
// GRADING DIALOG COMPONENT
// ---------------------------------------------------------------------------
function GradingDialog({ submissionId, onClose }: { submissionId: string; onClose: () => void }) {
  const { mutateAsync: getSingleSubmission } = useGetSingleSubmission();
  const { mutateAsync: getStudentGrade } = useStudentGetGrade();
  const { mutateAsync: gradeSubmission } = useGradeSubmission();
  const { mutateAsync: updateGrade } = useUpdateGrade();

  const [submission, setSubmission] = useState<any>(null);
  const [gradeInfo, setGradeInfo] = useState<any>(null);
  const [score, setScore] = useState<number | "">("");
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, [submissionId]);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch submission details
      const subRes: any = await getSingleSubmission(submissionId);
      setSubmission(subRes?.data || subRes);

      // 2. Try to fetch existing grade
      try {
        const gradeRes: any = await getStudentGrade(submissionId);
        const gradeData = gradeRes?.data || gradeRes;
        if (gradeData) {
          setGradeInfo(gradeData);
          setScore(gradeData.score ?? "");
          setComments(gradeData.comments ?? "");
        }
      } catch (gradeError) {
        // Normal behavior if no grade exists yet
        console.log("No grade exists yet for this submission.");
      }
    } catch (error) {
      toast.error("Failed to load submission details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGrade = async () => {
    if (score === "") {
      toast.error("Please enter a valid score");
      return;
    }

    setIsSubmitting(true);
    try {
      const payloadData = { score: Number(score), comments };

      if (gradeInfo?.gradeId) {
        // Update existing grade.
        // Note: useUpdateGrade hook interface uses `submissionId` as the first param name,
        // but calls GradeApi.updateGrade(gradeId, data) underneath.
        await updateGrade({
          submissionId: gradeInfo.gradeId.toString(),
          data: payloadData
        });
        toast.success("Grade updated successfully");
      } else {
        // Create new grade
        await gradeSubmission({
          submissionId,
          data: payloadData
        });
        toast.success("Grade submitted successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save grade");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Grading Submission: {submission?.studentUsername || "Loading..."}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6 py-4">
            {isLoading ? (
                <p className="text-muted-foreground text-center">Loading details...</p>
            ) : (
                <>
                  {/* Student's Work */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Student Description</Label>
                    <div className="p-4 bg-muted/30 rounded-lg min-h-[150px] whitespace-pre-wrap text-sm">
                      {submission?.description || "No description provided by student."}
                    </div>
                  </div>

                  {/* Grading Form */}
                  <div className="space-y-4 pt-4 border-t">
                    <Label className="text-base font-semibold">Evaluation</Label>
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Label htmlFor="score" className="text-right">Score</Label>
                      <Input
                          id="score"
                          type="number"
                          step="0.1"
                          min="0"
                          className="col-span-3"
                          value={score}
                          onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                          placeholder="e.g. 9.5"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-start">
                      <Label htmlFor="comments" className="text-right pt-2">Comments</Label>
                      <Textarea
                          id="comments"
                          className="col-span-3 min-h-[100px]"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="Leave feedback for the student..."
                      />
                    </div>
                  </div>
                </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSaveGrade} disabled={isSubmitting || isLoading}>
              {isSubmitting ? "Saving..." : gradeInfo?.gradeId ? "Update Grade" : "Submit Grade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

// ---------------------------------------------------------------------------
// STUDENT VIEW COMPONENT
// ---------------------------------------------------------------------------
function StudentAssignmentView({ assignmentId, assignment }: { assignmentId: string; assignment: any }) {
  const { mutateAsync: getSubmission } = useStudentGetSubmission();
  const { mutateAsync: createDraft } = useCreateSubmissionDraft();
  const { mutateAsync: updateDescription } = useUpdateSubmission();
  const { mutateAsync: submitDraft } = useSubmitSubmissionDraft();
  const { mutateAsync: getGrade } = useStudentGetGrade();

  const [description, setDescription] = useState("");
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"UNSUBMITTED" | "DRAFT" | "SUBMITTED">("UNSUBMITTED");
  const [gradeInfo, setGradeInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (assignmentId) loadSubmissionData();
  }, [assignmentId]);

  const loadSubmissionData = async () => {
    try {
      const res: any = await getSubmission(assignmentId);
      const submissions = res?.data || res;

      if (Array.isArray(submissions) && submissions.length > 0) {
        const sub = submissions[0];
        setSubmissionId(sub.id.toString());
        setDescription(sub.description || "");
        setStatus(sub.status);

        if (sub.status === "SUBMITTED") fetchGrade(sub.id.toString());
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
      console.log("Grade not yet available.");
    }
  };

  const handleSave = async () => {
    if (!assignmentId) return;
    setIsProcessing(true);
    try {
      if (!submissionId) {
        const res: any = await createDraft({ assignmentId, discription: description });
        const data = res?.data || res;
        setSubmissionId(data.id.toString());
        setStatus("DRAFT");
        toast.success("Draft created successfully");
      } else {
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
      if (!submissionId) {
        const res: any = await createDraft({ assignmentId, discription: description });
        const data = res?.data || res;
        setSubmissionId(data.id.toString());
      } else {
        await updateDescription({ submissionId, discription: description });
      }

      await submitDraft(submissionId);
      setStatus("SUBMITTED");
      toast.success("Assignment submitted successfully!");
      loadSubmissionData();
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-3xl">{assignment?.title || "Untitled Assignment"}</CardTitle>
                <p className="text-sm text-muted-foreground">Due Date: {assignment?.dueDate || "N/A"}</p>
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

        {gradeInfo && (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center text-green-700">Grade & Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-600">{gradeInfo.score}</span>
                </div>
                {gradeInfo.comments && (
                    <div className="text-sm bg-white/50 p-3 rounded border border-green-100">
                      <span className="font-semibold">Instructor Comments:</span> {gradeInfo.comments}
                    </div>
                )}
              </CardContent>
            </Card>
        )}

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
              <Button variant="outline" onClick={handleSave} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Save Draft"}
              </Button>
              <Button onClick={handleSubmit} disabled={isProcessing || !description.trim()}>
                {isProcessing ? "Processing..." : status === "SUBMITTED" ? "Update & Resubmit" : "Submit Assignment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}