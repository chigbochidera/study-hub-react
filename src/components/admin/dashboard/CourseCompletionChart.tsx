
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface CompletionDataPoint {
  name: string;
  completed: number;
  inProgress: number;
}

interface CourseCompletionChartProps {
  data: CompletionDataPoint[];
}

const CourseCompletionChart = ({ data }: CourseCompletionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Completion Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            completed: {
              label: "Completed",
              color: "#10B981",
            },
            inProgress: {
              label: "In Progress",
              color: "#F59E0B",
            },
          }}
          className="aspect-[4/3]"
        >
          <BarChart
            data={data}
            barCategoryGap={12}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <ChartTooltip
              content={
                <ChartTooltipContent indicator="dot" />
              }
            />
            <Legend />
            <Bar dataKey="completed" fill="#10B981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="inProgress" fill="#F59E0B" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CourseCompletionChart;
