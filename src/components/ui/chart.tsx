import * as React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

// Types shared across all chart types
interface ChartProps {
  data: Record<string, any>[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  chartColors?: string[];
}

// Props specific to CartesianCharts (Bar, Line, Area)
interface CartesianChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
}

// Props specific to PieChart
interface PieChartProps extends ChartProps {
  category: string;
  index: string;
  colors?: string[];
}

// Bar Chart
export function BarChart({
  data = [],
  index,
  categories,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
  yAxisWidth = 56,
}: CartesianChartProps) {
  const colorsMapped = colors.map((color) => `hsl(var(--${color}))`);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 16,
          }}
        >
          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              className="stroke-border"
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
              fontSize={12}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
              fontSize={12}
              tickMargin={8}
              tickFormatter={valueFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="border rounded-md shadow-sm bg-background p-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-medium">{payload[0].name}</div>
                        <div className="font-medium text-right">
                          {valueFormatter(payload[0].value as number)}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap gap-4 text-sm mt-2 justify-center">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          {categories.map((category, i) => (
            <Bar
              key={category}
              name={category}
              dataKey={category}
              fill={colorsMapped[i % colorsMapped.length]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={showAnimation}
              className="animation-delay-0"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Line Chart
export function LineChart({
  data = [],
  index,
  categories,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
  yAxisWidth = 56,
}: CartesianChartProps) {
  const colorsMapped = colors.map((color) => `hsl(var(--${color}))`);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 16,
          }}
        >
          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              className="stroke-border"
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
              fontSize={12}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
              fontSize={12}
              tickMargin={8}
              tickFormatter={valueFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="border rounded-md shadow-sm bg-background p-2 text-sm">
                      <div className="grid gap-1">
                        {payload.map((entry, i) => (
                          <div key={`tooltip-${i}`} className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground capitalize">
                              {entry.name}:
                            </span>
                            <span className="font-medium">
                              {valueFormatter(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap gap-4 text-sm mt-2 justify-center">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          {categories.map((category, i) => (
            <Line
              key={category}
              name={category}
              dataKey={category}
              stroke={colorsMapped[i % colorsMapped.length]}
              activeDot={{ r: 4 }}
              isAnimationActive={showAnimation}
              strokeWidth={2}
              dot={false}
              className={cn(
                "opacity-0 animation-in",
                showAnimation
                  ? "animate-in zoom-in-50 fade-in fill-mode-forwards"
                  : "opacity-100"
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart
export function PieChart({
  data = [],
  category,
  index,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showLegend = true,
  showTooltip = true,
}: PieChartProps) {
  const colorsMapped = colors.map((color) => `hsl(var(--${color}))`);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart
          margin={{
            top: 0,
            right: 0,
            bottom: 30,
            left: 0,
          }}
        >
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="border rounded-md shadow-sm bg-background p-2 text-sm">
                      <div className="font-medium">{data[index]}</div>
                      <div>
                        <span className="text-muted-foreground">{category}: </span>
                        <span className="font-medium">
                          {valueFormatter(data[category])}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          <Pie
            data={data}
            nameKey={index}
            dataKey={category}
            innerRadius={showLegend ? "35%" : "0%"}
            outerRadius={showLegend ? "70%" : "90%"}
            paddingAngle={2}
            isAnimationActive={showAnimation}
          >
            {data.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fill={colorsMapped[i % colorsMapped.length]}
                className={cn(
                  "opacity-0 animation-in",
                  showAnimation
                    ? "animate-in zoom-in-50 fade-in fill-mode-forwards"
                    : "opacity-100"
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </Pie>
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap gap-4 text-sm mt-2 justify-center">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}