import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateAssignment } from "@/hooks/useCreateAssignment"; // 引入你的 Hook

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export function CreateAssignmentDialog({ courseId, refetch }: { courseId: string | number, refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateAssignment(); // 使用你封装的 Hook

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  // 核心：匹配后端 @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
  const formatToBackendDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [date, time] = dateStr.split('T');
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year} ${time}:00`;
  };

  const onSubmit = async (data: any) => {
    const payload = {
      courseId: Number(courseId),
      title: data.title,
      description: data.description,
      dueDate: formatToBackendDate(data.dueDate),
      allowedFileTypes: data.allowedFileTypes,
      maxFileSizeMB: Number(data.maxFileSizeMB) || 10.0
    };

    try {
      await mutateAsync(payload); // 执行提交
      toast.success("Assignment created!");
      setOpen(false);
      reset();
      refetch(); // 刷新列表数据
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create");
    }
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Assignment</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input {...register("title", { required: true })} />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea {...register("description")} />
              </div>

              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Input type="datetime-local" {...register("dueDate", { required: true })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>File Types</Label>
                  <Input placeholder=".pdf,.zip" {...register("allowedFileTypes")} />
                </div>
                <div className="grid gap-2">
                  <Label>Max Size (MB)</Label>
                  <Input type="number" step="0.1" {...register("maxFileSizeMB")} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}