import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Warning } from "../components/commons/Warning";

export default function FullScreenLayout() {

    const [warning, setWarning] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [chances, setChances] = useState(3);

    const intentionalExit = useRef(false);

    const returnToFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }

            setShowWarning(false);

        } catch (error) {
            console.error("Failed to enter fullscreen:", error);
        }
    };


    useEffect(() => {

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

                setChances(prev => Math.max(prev - 1, 0));
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

            intentionalExit.current = true;

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(console.error);
            }
        };

    }, []);


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

            <Outlet context={{ setWarning, chances }} />
        </>
    );
}