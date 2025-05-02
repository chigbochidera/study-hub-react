
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface EnrollmentDataPoint {
  name: string;
  enrollments: number;
}

interface EnrollmentChartProps {
  data: EnrollmentDataPoint[];
}

const EnrollmentChart = ({ data }: EnrollmentChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            enrollments: {
              label: "Enrollments",
              color: "#8B5CF6",
            },
          }}
          className="aspect-[4/3]"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelKey="enrollments"
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="#8B5CF6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EnrollmentChart;
