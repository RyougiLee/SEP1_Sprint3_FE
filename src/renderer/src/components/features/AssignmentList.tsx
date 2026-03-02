import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge";

export function AssignmentList({assignments}:{assignments:any}) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  return(
      <div>
        <Table className="mt-[20px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Assignment Name</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment:any) => (
                <TableRow
                    key={assignment.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/workspaces/${courseId}/assignments/${assignment.id}`)}
                >
                  <TableCell className="font-medium">
                    {assignment.title}
                  </TableCell>
                  <TableCell>{assignment.dueDate || "No due date"}</TableCell>
                  <TableCell>
                    <Badge variant={assignment.status === "Completed" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {assignment.score !== undefined ? `${assignment.score}/100` : "-"}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}