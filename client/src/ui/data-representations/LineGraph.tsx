import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface ChartLine {
    name: string;
    data: number[];
}

interface DynamicLineChartProps {
    labels: string[];
    lines: ChartLine[];
    title?: string;
}

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

export default function LineGraph({
    labels,
    lines,
    title = "Performance Overview"
}: DynamicLineChartProps) {

    if (lines.length > 4) {
        throw new Error("Maximum 4 lines are allowed.");
    }

    lines.forEach((line) => {

        if (line.data.length !== labels.length) {
            throw new Error(
                `${line.name} data length must match labels length.`
            );
        }

        line.data.forEach((value) => {
            if (value < 0 || value > 100) {
                throw new Error(
                    "All chart values must be between 0 and 100."
                );
            }
        });

    });

    // Convert the provided data into Recharts format
    const data = labels.map((label, index) => {

        const item: Record<string, string | number> = {
            label
        };

        lines.forEach((line, lineIndex) => {
            item[`line${lineIndex}`] = line.data[index];
        });

        return item;

    });

    return (
        <div className="relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-lg font-semibold text-gray-800">
                {title}
            </h2>

            <div className="h-[350px] w-full pr-28">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip />

                        {lines.map((line, index) => (
                            <Line
                                key={line.name}
                                type="monotone"
                                dataKey={`line${index}`}
                                stroke={COLORS[index]}
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        ))}

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* Absolute positioned legend */}
            <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-3">

                {lines.map((line, index) => (

                    <div
                        key={line.name}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >

                        <div
                            className="h-3 w-3 rounded-full"
                            style={{
                                backgroundColor: COLORS[index]
                            }}
                        />

                        <span className="text-sm text-gray-600">
                            {line.name}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}
