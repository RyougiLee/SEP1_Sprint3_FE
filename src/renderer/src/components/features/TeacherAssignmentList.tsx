import React, {useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAssignmentsInCourse } from "@/hooks/useGetAssignmentsInCourse";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Send, Edit } from "lucide-react";
import axios from "axios";
import {EditAssignmentDialog} from "@/components/features/EditAssignmentDialog";
import {toast} from "sonner";
import {useCreateCourse} from "@/hooks/useCreateCourse";
import {useEditAssignment} from "@/hooks/useEditAssignment";
import {usePublishAssignment} from "@/hooks/usePublishAssignment";
import {useDeleteAssignment} from "@/hooks/useDeleteAssignment"; // 或你封装的 api 客户端

export function TeacherAssignmentList({assignments, isLoading, refetch}:{assignments:any, isLoading:boolean, refetch:any}) {
  const { courseId } = useParams();
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const { mutate: publishMutate } = usePublishAssignment();
  const { mutate: deleteMutate } = useDeleteAssignment();
  const { mutate: editMutate } = useEditAssignment();
  const navigate = useNavigate()

  const handleUpdate = async (id: string, formdata: any) => {
    console.log("Edit course submit", formdata)
    editMutate({ id, formData: formdata }, {
      onSuccess: () => {
        toast.success("Success edit new course");
      },
      onError: (err: any) => {
        toast.error(err.message || "Edit new course failed")
      }
    })
  };


  const handlePublish = (e: React.MouseEvent, assignmentId: number) => {
    e.stopPropagation(); // 阻止触发 TableRow 的跳转

    publishMutate(assignmentId, {
      onSuccess: () => {
        toast.success("Assignment published successfully!");
        refetch(); // 刷新列表获取最新状态
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to publish assignment");
      }
    });
  };


  const handleDelete = (e: React.MouseEvent, assignmentId: number) => {
    e.stopPropagation(); // 阻止触发 TableRow 的跳转

    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteMutate(assignmentId, {
        onSuccess: () => {
          toast.success("Assignment deleted!");
          refetch(); // 刷新列表
        },
        onError: (err: any) => {
          toast.error(err.message || "Delete failed");
        }
      });
    }
  };

  if (isLoading) return <div className="p-4 text-center text-muted-foreground">Loading...</div>;

  return (
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Assignment Name</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments?.map((assignment: any) => {
              // 建议：先做一个简单的逻辑变量，方便后续多次使用
              const isPublished = assignment.status === "PUBLISHED";

              return (
                  <TableRow
                      key={assignment.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => navigate(`/workspaces/${courseId}/assignments/${assignment.id}`)}
                  >
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell>{assignment.dueDate || "No due date"}</TableCell>
                    <TableCell>
                      {/* 修正点 1：使用 assignment.status 进行判断 */}
                      <Badge variant={isPublished ? "default" : "secondary"}>
                        {isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* 修正点 2：使用 isPublished 控制发布按钮的显示 */}
                        {!isPublished && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => handlePublish(e, assignment.id)}
                            >
                              <Send className="h-4 w-4 text-blue-500" />
                            </Button>
                        )}

                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingAssignment(assignment);
                            }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-destructive/10"
                            onClick={(e) => handleDelete(e, assignment.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {editingAssignment && (
            <EditAssignmentDialog
                assignment={editingAssignment}
                open={!!editingAssignment}
                onOpenChange={(open) => !open && setEditingAssignment(null)}
                onUpdate={handleUpdate}
            />
        )}
      </div>
  );
}