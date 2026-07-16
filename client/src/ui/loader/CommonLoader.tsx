import React from "react";

interface CommonLoaderProps {
    size?: number;
    color?: string;
}

const CommonLoader: React.FC<CommonLoaderProps> = ({ size  = 10 }) => {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`
                    h-${size} w-${size}
                    rounded-full
                    border-4
                    border-black/20
                    border-t-black
                    animate-spin
                    dark:border-white/20
                    dark:border-t-white
                `}
            />
        </div>
    );
};

export default CommonLoader;