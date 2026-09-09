type WarningProps = {
    warning: string;
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
    returnToFullscreen: () => Promise<void>;
};

export const Warning = ({
    warning,
    returnToFullscreen
}: WarningProps) => {

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-6">
            
            <h1 className="text-xl font-bold text-red-600">
                Warning
            </h1>

            <p className="mt-3">
                {warning}
            </p>

            <button
                onClick={returnToFullscreen}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
                Return to Fullscreen
            </button>

        </div>
    );
};