import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Warning } from "../components/commons/Warning";

export default function FullScreenLayout() {

    const [warning, setWarning] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [toFullScreen, setToFullScreen] = useState(true);
    const [chances, setChances] = useState(3);
    const [limitReached, setLimitReached] = useState(false);

    const intentionalExit = useRef(false);

    const returnToFullscreen = async () => {
        try {
            intentionalExit.current = false;

            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }

            setShowWarning(false);

        } catch (error) {
            console.error("Failed to enter fullscreen:", error);
        }
    };

    useEffect(() => {

        if (!toFullScreen) {
            // If fullscreen is no longer required, exit it.
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(console.error);
            }

            return;
        }

        const enterFullscreen = async () => {
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (error) {
                console.error("Failed to enter fullscreen:", error);
            }
        };

        const handleFullscreenChange = () => {

            if (
                !document.fullscreenElement &&
                !intentionalExit.current
            ) {
                console.log("User exited fullscreen");

                setWarning("You exited fullscreen mode!");
                setShowWarning(true);

                setChances(prev => {
                    const next = Math.max(prev - 1, 0);

                    if (next === 0) {
                        setLimitReached(true);
                    }

                    return next;
                });
            }
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        enterFullscreen();

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };

    }, [toFullScreen]);

    return (
        <>
            {showWarning && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                    <Warning
                        warning={warning}
                        setShowWarning={setShowWarning}
                        returnToFullscreen={returnToFullscreen}
                    />
                </div>
            )}

            <Outlet
                context={{
                    setWarning,
                    chances,
                    limitReached,
                    setToFullScreen
                }}
            />
        </>
    );
}