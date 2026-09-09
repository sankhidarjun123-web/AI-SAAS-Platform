import { useMemo } from "react";
import { Companies as CompaniesData } from "../../assets/images";

const shuffle = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const Companies = () => {
    const row1 = useMemo(() => shuffle(CompaniesData), []);
    const row2 = useMemo(() => shuffle(CompaniesData), []);
    const row3 = useMemo(() => shuffle(CompaniesData), []);

    const renderRow = (
        companies: typeof CompaniesData,
        reverse = false
    ) => {
        const loopCompanies = [...companies, ...companies];

        return (
            <div className="relative h-20 w-full overflow-hidden">
                <div
                    className={`absolute left-0 top-0 flex items-center gap-16 ${
                        reverse
                            ? "animate-marquee-reverse"
                            : "animate-marquee"
                    }`}
                >
                    {loopCompanies.map((company, index) => (
                        <img
                            key={`${company.id}-${index}`}
                            src={company.logo}
                            alt={company.name}
                            className="h-12 w-auto shrink-0 object-contain"
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full overflow-hidden bg-white dark:bg-slate-900">
            <div className="flex w-full flex-col gap-12">
                {renderRow(row1)}
                {renderRow(row2, true)}
                {renderRow(row3)}
            </div>
        </div>
    );
};