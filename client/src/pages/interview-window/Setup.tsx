import { useState, useEffect, useRef } from "react";
import {
    Camera,
    CheckCircle2,
    ChevronRight,
    Globe,
    Mic,
    MicOff,
    CameraOff,
    Wifi,
    Check,
    X,
    LoaderCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";



type CheckStatus = "checking" | "success" | "failed";

interface SetupChecks {
    internet: CheckStatus;
    stability: CheckStatus;
    camera: CheckStatus;
    microphone: CheckStatus;
}

const StatusIndicator = ({
    status,
}: {
    status: CheckStatus;
}) => {

    if (status === "checking") {
        return (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <LoaderCircle
                    size={17}
                    className="animate-spin text-zinc-400 dark:text-zinc-500"
                />
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                <Check size={18} strokeWidth={2.5} />
            </div>
        );
    }

    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <X size={18} strokeWidth={2.5} />
        </div>
    );
};

const Setup = () => {

    const navigate = useNavigate();
    const { interviewId } = useParams();
    const [canStart, setCanStart] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [micEnabled, setMicEnabled] = useState(true);
    const [checks, setChecks] = useState<SetupChecks>({
        internet: "checking",
        stability: "checking",
        camera: "checking",
        microphone: "checking",
    });


    useEffect(() => {

        const canStartInterview = () => {

            if (!cameraEnabled) return false;

            if (!micEnabled) return false;

            return Object.values(checks).every(
                (value) => value === "success"
            );
        }

        setCanStart(canStartInterview);
    }, [checks, cameraEnabled, micEnabled]);

    /* =========================================================
       CAMERA + MICROPHONE
    ========================================================= */

    useEffect(() => {

        const startMedia = async () => {

            try {

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                setChecks((prev) => ({
                    ...prev,
                    camera: "checking",
                    microphone: "checking"
                }));

                const videoTrack = stream.getVideoTracks()[0];
                const audioTrack = stream.getAudioTracks()[0];

                const cameraWorking =
                    !!videoTrack &&
                    videoTrack.readyState === "live";

                const microphoneWorking =
                    !!audioTrack &&
                    audioTrack.readyState === "live";

                setChecks((prev) => ({
                    ...prev,
                    camera: cameraWorking ? "success" : "failed",
                    microphone: microphoneWorking ? "success" : "failed",
                }));

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

            } catch (error) {

                console.error(
                    "Unable to access camera or microphone:",
                    error
                );

                setChecks((prev) => ({
                    ...prev,
                    camera: "failed",
                    microphone: "failed"
                }))

            }

        };

        startMedia();


        /* Cleanup */
        return () => {

            streamRef.current?.getTracks().forEach((track) => {
                track.stop();
            });

        };

    }, []);

    const checkInternet = async (): Promise<boolean> => {
        if (!navigator.onLine) {
            return false;
        }

        try {
            const response = await fetch("/api/health", {
                method: "GET",
                cache: "no-store",
            });

            return response.ok;
        } catch (error) {
            console.error("Internet connection check failed:", error);
            return false;
        }
    };


    const checkStability = async (): Promise<boolean> => {
        const latencies: number[] = [];

        for (let i = 0; i < 5; i++) {

            const start = performance.now();

            try {
                const response = await fetch("/api/health", {
                    method: "GET",
                    cache: "no-store",
                });

                if (!response.ok) {
                    return false;
                }

                const latency = performance.now() - start;

                latencies.push(latency);

            } catch (error) {
                console.error(
                    `Connection stability check ${i + 1} failed:`,
                    error
                );

                return false;
            }

            // Small gap between requests
            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );
        }

        const averageLatency =
            latencies.reduce(
                (sum, latency) => sum + latency,
                0
            ) / latencies.length;

        const maximumLatency = Math.max(...latencies);

        console.log("Connection latencies:", latencies);
        console.log("Average latency:", averageLatency);
        console.log("Maximum latency:", maximumLatency);

        /*
            Stable connection:
    
            Average latency < 300ms
            AND
            No request > 800ms
        */

        return (
            averageLatency < 300 &&
            maximumLatency < 800
        );
    };


    const runConnectionChecks = async () => {

        setChecks((prev) => ({
            ...prev,
            internet: "checking",
            stability: "checking",
        }));

        const internet = await checkInternet();

        setChecks((prev) => ({
            ...prev,
            internet: internet
                ? "success"
                : "failed",
        }));

        if (!internet) {
            setChecks((prev) => ({
                ...prev,
                stability: "failed",
            }));

            return;
        }

        const stable = await checkStability();

        setChecks((prev) => ({
            ...prev,
            stability: stable
                ? "success"
                : "failed",
        }));
    };


    useEffect(() => {
        runConnectionChecks();
    }, []);


    /* =========================================================
       CAMERA TOGGLE
    ========================================================= */

    const toggleCamera = () => {

        const videoTrack = streamRef.current?.getVideoTracks()[0];

        if (!videoTrack) return;

        videoTrack.enabled = !videoTrack.enabled;

        setCameraEnabled(videoTrack.enabled);

    };


    /* =========================================================
       MICROPHONE TOGGLE
    ========================================================= */

    const toggleMicrophone = () => {

        const audioTrack = streamRef.current?.getAudioTracks()[0];

        if (!audioTrack) return;

        audioTrack.enabled = !audioTrack.enabled;

        setMicEnabled(audioTrack.enabled);

    };

    const hardwareStatus: CheckStatus =
        checks.camera === "checking" ||
            checks.microphone === "checking"
            ? "checking"
            : checks.camera === "success" &&
                checks.microphone === "success"
                ? "success"
                : "failed";
    return (
        <section className="w-full h-full overflow-hidden bg-[#EEE9DF] dark:bg-slate-950 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">

            {/* =========================================================
                LEFT — CAMERA PREVIEW
            ========================================================= */}
            <div className="w-full h-full flex items-center justify-center p-5 sm:p-7 lg:p-10">

                <div className="w-full max-w-2xl">

                    {/* Camera Preview */}
                    <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-900 shadow-sm dark:border-zinc-800/80">

                        {/* Actual Camera */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 h-full w-full object-cover"
                        />


                        {/* Camera Status */}
                        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">

                            <span
                                className={`h-1.5 w-1.5 rounded-full ${cameraEnabled
                                    ? "bg-indigo-400"
                                    : "bg-red-400"
                                    }`}
                            />

                            <span className="text-[11px] font-medium text-zinc-300">
                                {cameraEnabled
                                    ? "Camera on"
                                    : "Camera off"}
                            </span>

                        </div>


                        {/* Controls */}
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">

                            {/* Microphone */}
                            <button
                                type="button"
                                onClick={toggleMicrophone}
                                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition ${micEnabled
                                    ? "border-white/10 bg-white/10 text-zinc-200 hover:bg-white/20"
                                    : "border-red-500/30 bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {micEnabled ? (
                                    <Mic size={17} />
                                ) : (
                                    <MicOff size={17} />
                                )}
                            </button>


                            {/* Camera */}
                            <button
                                type="button"
                                onClick={toggleCamera}
                                className={`flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition ${cameraEnabled
                                    ? "border-white/10 bg-white/10 text-zinc-200 hover:bg-white/20"
                                    : "border-red-500/30 bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {cameraEnabled ? (
                                    <Camera size={17} />
                                ) : (
                                    <CameraOff size={17} />
                                )}
                            </button>

                        </div>

                    </div>


                    {/* Helper Text */}
                    <div className="mt-4 flex items-center justify-center text-center">

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">

                            {cameraEnabled
                                ? "Position yourself clearly within the camera frame"
                                : "Your camera is currently turned off"}

                        </p>

                    </div>

                </div>

            </div>


            {/* =========================================================
                RIGHT — SETUP CHECKS
            ========================================================= */}
            <div className="w-full h-full flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-14">

                <div className="w-full max-w-xl mx-auto">

                    {/* Header */}
                    <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">

                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                            Interview Setup
                        </span>

                        <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                            Welcome to the Interview
                        </h2>

                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
                            Let's make sure everything is ready before you begin.
                            This will only take a few seconds.
                        </p>

                    </div>


                    {/* Setup Checks */}
                    <div className="mt-6 space-y-3">

                        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 transition-colors dark:border-zinc-800/80 dark:bg-zinc-950">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                                        <Globe size={19} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                            Internet Connection
                                        </h3>

                                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                            {checks.internet === "checking"
                                                ? "Checking your connection..."
                                                : checks.internet === "success"
                                                    ? "Connection established"
                                                    : "Unable to connect to the server"}
                                        </p>
                                    </div>

                                </div>

                                <StatusIndicator status={checks.internet} />

                            </div>

                        </div>


                        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 transition-colors dark:border-zinc-800/80 dark:bg-zinc-950">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                                        <Camera size={19} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                            Camera & Microphone
                                        </h3>

                                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                            {hardwareStatus === "checking"
                                                ? "Checking your devices..."
                                                : hardwareStatus === "success"
                                                    ? "Camera and microphone are ready"
                                                    : "Camera or microphone unavailable"}
                                        </p>
                                    </div>

                                </div>

                                <StatusIndicator status={hardwareStatus} />

                            </div>

                        </div>


                        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 transition-colors dark:border-zinc-800/80 dark:bg-zinc-950">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                                        <Wifi size={19} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                            Connection Stability
                                        </h3>

                                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                            {checks.stability === "checking"
                                                ? "Testing connection stability..."
                                                : checks.stability === "success"
                                                    ? "Connection is stable"
                                                    : "Connection is unstable"}
                                        </p>
                                    </div>

                                </div>

                                <StatusIndicator status={checks.stability} />

                            </div>

                        </div>
                    </div>
                    {/* Start Interview */}
                    <button
                        disabled={!canStart}
                        type="button"
                        onClick={() => navigate(`/interview-window/${interviewId}/screen`)}
                        className="group mt-6 flex w-full disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600 hover:shadow-md active:scale-[0.99]"
                    >
                        Start Interview

                        <ChevronRight
                            size={18}
                            className="transition-transform group-hover:translate-x-0.5"
                        />

                    </button>


                    {/* Small Notice */}
                    <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
                        You can adjust your camera and microphone before starting.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Setup;