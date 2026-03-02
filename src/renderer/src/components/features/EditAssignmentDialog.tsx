import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface EditAssignmentProps {
  assignment: any; // 初始作业数据
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, data: any) => Promise<void>;
}

export function EditAssignmentDialog({ assignment, open, onOpenChange, onUpdate }: EditAssignmentProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      title: assignment?.title || "",
      description: assignment?.description || "",
      dueDate: assignment?.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : "",
      allowedFileTypes: assignment?.allowedFileTypes || "",
      maxFileSizeMB: assignment?.maxFileSizeMB || 10,
    }
  });

  const onSubmit = async (data: any) => {
    // 转换数字类型以符合后端 CreateAssignmentRequest 结构
    const formatDate = (dateStr: string) => {
      if (!dateStr) return null;
      const [date, time] = dateStr.split('T');
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year} ${time}:00`;
    };

    const payload = {
      ...data,
      dueDate: formatDate(data.dueDate),
      maxFileSizeMB: Number(data.maxFileSizeMB)
    };
    await onUpdate(assignment.id, payload);
    onOpenChange(false);
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title", { required: "Title is required" })} />
                {errors.title && <span className="text-xs text-destructive">{errors.title.message as string}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="datetime-local" {...register("dueDate")} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fileTypes">File Types (e.g. .pdf,.zip)</Label>
                  <Input id="fileTypes" {...register("allowedFileTypes")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxSize">Max Size (MB)</Label>
                  <Input id="maxSize" type="number" {...register("maxFileSizeMB")} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Assignment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}