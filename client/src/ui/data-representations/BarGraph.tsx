import { motion } from "framer-motion";

interface GraphValue {
    name: string;
    value: number;
    color?: string;
}

interface BarGraphProps {
    data: GraphValue[];
    height?: number;
}

export const BarGraph = ({ data, height = 300 }: BarGraphProps) => {

    const scale = [100, 75, 50, 25, 0];
    const itemWidth = 56;
    const gap = 48;

    const graphWidth = Math.max(
        data.length * itemWidth + Math.max(data.length - 1, 0) * gap,
        100
    );

    return (
        <div className="relative w-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-lg p-5 overflow-hidden" style={{ scrollbarWidth: "none" }}>

            {/* Top Section */}
            <div className="flex items-start justify-between gap-5 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Performance Analysis</h2>
                    <p className="text-sm text-slate-500">Score comparison out of 100</p>
                </div>
            </div>


            {/* Graph Container */}
            <div className="w-full flex" style={{ scrollbarWidth: "none" }}>

                {/* Y Axis */}
                <div className="w-10 shrink-0 flex flex-col justify-between text-xs text-slate-400" style={{ height }}>
                    {scale.map((value) => (
                        <span key={value} className="leading-none">
                            {value}
                        </span>
                    ))}
                </div>


                {/* Scrollable Area */}
                <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>

                    <div
                        className="relative border-l border-b border-slate-200"
                        style={{
                            height,
                            width: `${graphWidth}px`,
                            minWidth: "100%"
                        }}
                    >

                        {/* Grid Lines */}
                        {scale.map((value) => (
                            <div
                                key={value}
                                className="absolute left-0 right-0 border-t border-slate-100"
                                style={{ bottom: `${value}%` }}
                            />
                        ))}


                        {/* Bars */}
                        <div className="absolute inset-0 flex items-end gap-12 px-4">

                            {data.map((item, index) => {

                                const value = Math.min(Math.max(item.value, 0), 100);
                                const color = item.color || "#3b82f6";

                                return (
                                    <div key={index} className="relative h-full w-14 shrink-0 flex items-end justify-center">



                                        {/* Animated Bar */}
                                        <motion.div
                                            className="w-full relative rounded-t-md"
                                            style={{ backgroundColor: color }}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${value}%` }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.06,
                                                ease: "easeOut"
                                            }}
                                        >
                                            {/* Value */}
                                            <span
                                                className="absolute text-white top-4 left-[35%] text-xs font-semibold"
                                                style={{ bottom: `calc(${value}% + 5px)` }}
                                            >
                                                {value}
                                            </span>
                                        </ motion.div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>


                    {/* X Axis Names */}
                    <div
                        className="flex gap-12 px-4"
                        style={{
                            width: `${graphWidth}px`,
                            minWidth: "100%"
                        }}
                    >

                        {data.map((item, index) => (
                            <div key={index} className="w-14 shrink-0 pt-3 text-center text-xs font-medium text-slate-600 truncate">
                                {item.name}
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );

};
