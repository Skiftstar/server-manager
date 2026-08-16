import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";

interface DataPoint {
  index: number;
  value: number;
}

interface SmoothLineChartProps {
  data: number[];
}

export default function SmoothLineChart({ data }: SmoothLineChartProps) {
  const chartData: DataPoint[] = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="80%">
      <LineChart data={chartData}>
        <YAxis domain={[0, 100]} hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-accent)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
