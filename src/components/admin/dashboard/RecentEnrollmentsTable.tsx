
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Enrollment {
  id: number;
  student: string;
  course: string;
  date: string;
}

interface RecentEnrollmentsTableProps {
  enrollments: Enrollment[];
}

const RecentEnrollmentsTable = ({ enrollments }: RecentEnrollmentsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>{enrollment.student}</TableCell>
                <TableCell>{enrollment.course}</TableCell>
                <TableCell>{new Date(enrollment.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentEnrollmentsTable;
