import {
    CircleStop,
    MoreVertical,
    PanelRight,
    PhoneOff,
    Timer,
    Wifi,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Anna } from "../../assets/images";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startInterview } from "../../api/interview.api";
import { startGeminiSession } from "../../services/gemini.service";
import { playPCMChunk, prepareAudio } from "../../services/audio.service";
import {
    GeminiMicrophone
} from "../../services/audio-input.service";
import { endInterview as endInterviewApi } from "../../api/interview.api";
import CommonLoader from "../../ui/loader/CommonLoader";
import { startRecording, stopRecording, startSpeakingDetection, stopSpeakingDetection } from "../../utils/interviewSetup";
import { interviewPrompt } from "../../utils/interviewPrompt";

type InterviewQA = {
    question: string;
    answer: string;
};


const InterviewScreen = () => {

    const navigate = useNavigate();
    const { limitReached, setToFullScreen }: { limitReached: boolean, setToFullScreen: React.Dispatch<SetStateAction<boolean>> } = useOutletContext();
    const { interviewId } = useParams();

    // all refs
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const geminiSessionRef = useRef<any>(null);
    const audioContextRef =
        useRef<AudioContext | null>(null);

    const nextAudioStartTimeRef =
        useRef<number>(0);

    const interviewQARef = useRef<InterviewQA[]>([]);

    const recordedChunksRef = useRef<Blob[]>([]);

    const geminiMicrophoneRef =
        useRef<GeminiMicrophone | null>(null);

    const analyserRef =
        useRef<AnalyserNode | null>(null);

    const speakingAnimationRef =
        useRef<number | null>(null);

    const speakingAudioContextRef =
        useRef<AudioContext | null>(null);

    const interviewEndedRef =
        useRef(false);

    const currentQuestionRef =
        useRef("");

    const currentAnswerRef =
        useRef("");

    // all states
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isSpeaking, setIsSpeaking] =
        useState(false);

    const [interviewQA, setInterviewQA] = useState<InterviewQA[]>([]);

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [interviewActive, setInterviewActive] = useState<boolean>(false);
    const [interviewType, setInterviewType] = useState<string>("HR Interview");
    const [interviewieName, setInterviwieName] = useState<string>("Annoymous");
    const [interviewRole, setInterviewRole] = useState<string>("Frontend Developer");

    const [annaSpeaking, setAnnaSpeaking] = useState<boolean>(false);

    useEffect(() => {
        console.log(`You speaking: ${isSpeaking ? "Yes" : "No"}`);
    }, [isSpeaking]);

    /*===========MAIN FUNCTIONS TO HANDLE THE QUESTION AND ANSWER DATA FROM THE GEMINI===============*/
    // this function runs everytime the value of question and answer changes apparently it only appends the
    // interviewQA ref when both question and answers are avaible and it needs shift their as questions shall be pushed
    // first they shall not wait for the answers to be delivered to complete the transaction
    const saveCurrentQA = () => {
        const question = currentQuestionRef.current.trim();
        const answer = currentAnswerRef.current.trim();

        // No question means nothing to save
        if (!question) {
            return;
        }

        const qa = {
            question,
            answer: answer || "Unavailable"
        };

        // Ref → backend/submission data
        interviewQARef.current.push(qa);

        // State → UI rendering
        setInterviewQA(prev => [
            ...prev,
            qa
        ]);

        console.log("✅ Q&A Saved:", interviewQARef.current);

        currentQuestionRef.current = "";
        currentAnswerRef.current = "";
    };


    const handleGeminiQuestion = (text: string) => {

        if (!text.trim()) return;


        const END_SIGNAL = "[INTERVIEW_END]";


        const isInterviewEnding =
            text.includes(END_SIGNAL);


        const cleanText = text
            .replace(END_SIGNAL, "")
            .trim();


        console.log("Anna:", cleanText);


        // ===============================
        // INTERVIEW END
        // ===============================

        if (isInterviewEnding) {

            console.log(
                "🛑 Gemini ended the interview"
            );


            // Save the last answer
            saveCurrentQA();


            // Wait for Gemini's final audio
            setTimeout(() => {

                endInterview();

            }, 3000);


            return;
        }


        // ===============================
        // NORMAL QUESTION
        // ===============================

        saveCurrentQA();


        currentQuestionRef.current =
            cleanText;
    };


    const handleGeminiAudio = (
        audioBase64: string
    ) => {

        if (!audioBase64) {
            return;
        }

        playPCMChunk(
            setAnnaSpeaking,
            audioBase64,
            audioContextRef,
            nextAudioStartTimeRef
        );
    };

    const handleCandidateTranscript = (text: string) => {

        if (!text.trim()) return;

        currentAnswerRef.current += text + " ";

        console.log(
            "Candidate:",
            currentAnswerRef.current
        );
    };
    const handleGeminiTurnComplete = () => {

        console.log(
            "Gemini turn completed"
        );
    };


    const endInterview = async () => {

        setSubmitting(true);
        if (interviewEndedRef.current) {
            return;
        }

        interviewEndedRef.current = true;

        // 1. Save final Q&A
        saveCurrentQA();

        console.log(
            "Final Q&A:",
            interviewQARef.current
        );

        // 2. Stop microphone -> Gemini
        geminiMicrophoneRef.current?.stop();
        geminiMicrophoneRef.current = null;

        // 3. Close Gemini Live session
        geminiSessionRef.current?.close();
        geminiSessionRef.current = null;

        try {
            const videoBlob =
                await stopRecording(mediaRecorderRef, recordedChunksRef);

            console.log(
                "Video Blob:",
                videoBlob
            );

            // 4. Stop MediaRecorder
            if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state !== "inactive"
            ) {
                mediaRecorderRef.current.stop();
            }

            mediaRecorderRef.current = null;

            // 5. Stop speaking detection
            stopSpeakingDetection(speakingAnimationRef, speakingAudioContextRef, analyserRef, setIsSpeaking);

            // 6. Stop camera + browser microphone
            streamRef.current?.getTracks().forEach(
                (track) => track.stop()
            );

            streamRef.current = null;

            // 7. Close Gemini audio output
            if (audioContextRef.current) {
                try {
                    await audioContextRef.current.close();
                } catch (error) {
                    console.error(
                        "Audio context close error:",
                        error
                    );
                }

                audioContextRef.current = null;
            }

            const formData = new FormData();

            if (videoBlob) {
                formData.append(
                    "interview",
                    videoBlob,
                    `interview-${interviewId}.webm`
                );
            }

            formData.append(
                "interviewQA",
                JSON.stringify(interviewQARef.current)
            );

            await endInterviewApi(interviewId, formData);

            // 8. Update UI
            setIsRecording(false);
            setInterviewActive(false);

            console.log("Interview ended");
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };



    /*===================ALL SIDE EFFECTS================================*/

    useEffect(() => {

        let cancelled = false;

        const initializeInterview = async () => {

            try {

                setLoading(true);

                interviewEndedRef.current =
                    false;


                // =====================================
                // 1. Validate interview ID
                // =====================================

                if (!interviewId) {
                    throw new Error(
                        "InterviewId is required"
                    );
                }


                // =====================================
                // 2. Request camera + microphone
                // =====================================

                const stream =
                    await navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: true,
                        });


                if (cancelled) {

                    stream
                        .getTracks()
                        .forEach(
                            track => track.stop()
                        );

                    return;
                }


                streamRef.current =
                    stream;


                // =====================================
                // 3. Show candidate video
                // =====================================

                if (videoRef.current) {
                    videoRef.current.srcObject =
                        stream;

                }


                // =====================================
                // 4. Prepare Gemini audio output
                // =====================================

                await prepareAudio(
                    audioContextRef
                );


                // =====================================
                // 5. Start recording
                // =====================================

                startRecording(streamRef, recordedChunksRef, mediaRecorderRef, setIsRecording);


                // =====================================
                // 6. Start speaking detection
                // =====================================

                await startSpeakingDetection(streamRef, speakingAudioContextRef, analyserRef, interviewEndedRef, setIsSpeaking, speakingAnimationRef);


                // =====================================
                // 7. Start backend interview
                // =====================================

                const interviewData =
                    await startInterview(
                        interviewId
                    );


                if (cancelled) {
                    return;
                }


                const token =
                    interviewData.token;

                const interviewDetails = interviewData.interviewDetails;

                const resumeDetails = interviewData.resumeDetails;

                setInterviewRole(interviewDetails.target_role);
                setInterviwieName(resumeDetails.candidate_name);
                setInterviewType(interviewDetails.interview_type + " Interview");

                console.log("Interview Details: ", interviewDetails,
                    "\nResume Details: ", resumeDetails
                )


                if (!token) {
                    throw new Error(
                        "Gemini token was not returned"
                    );
                }


                // =====================================
                // 8. Connect Gemini
                // =====================================

                const session =
                    await startGeminiSession(
                        token,
                        interviewDetails,
                        resumeDetails,

                        handleGeminiQuestion,

                        handleGeminiAudio,

                        handleCandidateTranscript,

                        handleGeminiTurnComplete,

                        endInterview
                    );


                if (cancelled) {

                    session.close();

                    return;
                }


                geminiSessionRef.current =
                    session;


                // =====================================
                // 9. Start microphone -> Gemini
                // =====================================

                const microphone =
                    new GeminiMicrophone();


                geminiMicrophoneRef.current =
                    microphone;


                await microphone.start(
                    stream,
                    session
                );


                if (cancelled) {
                    return;
                }


                // =====================================
                // 10. Interview is active
                // =====================================

                setInterviewActive(true);


                // =====================================
                // 11. Ask first question
                // =====================================

                session.sendClientContent({
                    turns: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: interviewPrompt({ interviewDetails, resumeDetails }),
                                },
                            ],
                        },
                    ],
                    turnComplete: true,
                });

            } catch (error) {

                console.error(
                    "Failed to start interview:",
                    error
                );

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };


        initializeInterview();


        return () => {

            cancelled = true;

            endInterview();

        };

    }, [interviewId]);


    // Interview timer
    useEffect(() => {
        if (!isRecording) return;

        const interval = setInterval(() => {
            setElapsedTime((previous) => previous + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    // end the interview immediately if the user exists the full screen
    // and all the chances are gone
    useEffect(() => {
        if (limitReached) endInterview();
    }, [limitReached]);


    useEffect(() => {
        if (submitting) setToFullScreen(false);
    }, [submitting]);

    useEffect(() => {
        if (!submitting) return;

        const timer = setTimeout(() => {
            navigate(`/interview-window/${interviewId}/end`);
        }, 3000);

        return () => clearTimeout(timer);
    }, [submitting, navigate]);


    useEffect(() => {
        const video = videoRef.current;
        const stream = streamRef.current;

        if (!video || !stream) {
            return;
        }

        video.srcObject = stream;

        video.play().catch((error) => {
            console.error(
                "Failed to play camera preview:",
                error
            );
        });

    }, [interviewActive]);
    return (
        <section
            className="
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        bg-[#EEE9DF]
        text-zinc-900
        dark:bg-zinc-950
        dark:text-zinc-100
    "
        >
            {submitting ? (

                <div className="flex flex-1 items-center flex-col justify-center">
                    <CommonLoader />

                    <span>We are submitting your response!</span>
                </div>

            ) : (<>
                {/* =========================================
                TOP BAR
            ========================================= */}

                <header
                    className="
                    flex
                    h-20
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-zinc-200/80
                    bg-[#EEE9DF]
                    px-5
                    sm:px-7
                    dark:border-zinc-800/80
                    dark:bg-zinc-950
                "
                >
                    {/* Interview information */}

                    <div className="flex min-w-0 items-center gap-4">

                        <div className="min-w-0">

                            <h1
                                className="
                                truncate
                                text-sm
                                font-bold
                                tracking-tight
                                text-zinc-900
                                dark:text-zinc-100
                            "
                            >
                                {interviewRole}
                            </h1>

                            <p
                                className="
                                mt-0.5
                                text-[11px]
                                text-zinc-500
                                dark:text-zinc-400
                            "
                            >
                                {interviewType}
                            </p>

                        </div>


                        {/* Recording indicator */}

                        <div
                            className="
                            hidden
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-red-500/20
                            bg-red-500/5
                            px-3
                            py-1.5
                            sm:flex
                            dark:bg-red-500/10
                        "
                        >
                            <span
                                className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-red-500
                            "
                            />

                            <span
                                className="
                                text-[11px]
                                font-semibold
                                text-red-500
                                dark:text-red-400
                            "
                            >
                                {loading
                                    ? "Starting"
                                    : "Recording"}
                            </span>

                        </div>

                    </div>


                    {/* Right side */}

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                        <div
                            className="
                            hidden
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-zinc-200
                            bg-white/60
                            px-3
                            py-1.5
                            sm:flex
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        "
                        >
                            <Wifi
                                size={14}
                                className="text-green-500"
                            />

                            <span
                                className="
                                text-[11px]
                                font-medium
                                text-zinc-500
                                dark:text-zinc-400
                            "
                            >
                                Good connection
                            </span>

                        </div>


                        <button
                            type="button"
                            className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            text-zinc-500
                            transition
                            hover:bg-white
                            hover:text-zinc-900
                            dark:text-zinc-400
                            dark:hover:bg-zinc-900
                            dark:hover:text-zinc-100
                        "
                        >
                            <MoreVertical size={18} />
                        </button>

                    </div>

                </header>


                {/* =========================================
                VIDEO AREA
            ========================================= */}

                <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-3 sm:p-2 lg:p-3">
                    <div
                        className="
            grid
            h-full
            w-7xl
            grid-cols-2
            grid-rows-2
            gap-3
            sm:gap-4
        "
                    >

                        {/* =====================================
                    ANNA VIDEO
        ===================================== */}

                        <div
                            className="
                relative
                min-h-0
                overflow-hidden
                rounded-2xl
                border
                border-zinc-200/80
                bg-zinc-900
                shadow-lg
                dark:border-zinc-800/80
            "
                        >

                            {/* Anna Background */}

                            <div
                                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-zinc-800
                    via-zinc-900
                    to-black
                "
                            >

                                <div className="text-center">

                                    {/* Anna Image */}

                                    <div
                                        className={`
        mx-auto
        h-16
        w-16
        overflow-hidden
        rounded-full
        border-2
        border-white/10
        transition-all
        duration-700
        ease-in-out
        sm:h-24
        sm:w-24
        lg:h-36
        lg:w-36

        ${annaSpeaking
                                                ? "scale-105 shadow-[0_0_25px_8px_rgba(99,102,241,0.45)]"
                                                : "scale-100 shadow-xl"
                                            }
    `}
                                    >
                                        <img
                                            src={Anna}
                                            alt="Anna - Interviewer"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>


                                    <p
                                        className="
                            mt-3
                            text-sm
                            font-semibold
                            text-zinc-100
                            sm:mt-4
                            sm:text-base
                        "
                                    >
                                        Anna
                                    </p>


                                    <p className="mt-1 text-xs text-zinc-400">
                                        Interviewer
                                    </p>

                                </div>

                            </div>


                            {/* Recording Indicator */}

                            <div
                                className="
                    absolute
                    left-3
                    top-3
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-black/40
                    px-2.5
                    py-1.5
                    backdrop-blur-md
                    sm:left-4
                    sm:top-4
                    sm:px-3
                "
                            >

                                <span
                                    className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-red-500
                    "
                                />

                                <span
                                    className="
                        text-[10px]
                        font-semibold
                        text-zinc-200
                        sm:text-[11px]
                    "
                                >
                                    Recording
                                </span>

                            </div>


                            {/* Anna Name */}

                            <div
                                className="
                    absolute
                    bottom-3
                    left-3
                    rounded-xl
                    border
                    border-white/10
                    bg-black/40
                    px-2.5
                    py-2
                    backdrop-blur-md
                    sm:bottom-4
                    sm:left-4
                    sm:px-3
                "
                            >

                                <div className="flex items-center gap-2">

                                    <span className="text-xs font-semibold text-zinc-100">
                                        Anna
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span className="text-[10px] text-zinc-400">
                                        Interviewer
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =====================================
                    YOUR CAMERA
        ===================================== */}

                        <div
                            className="
                relative
                min-h-0
                overflow-hidden
                rounded-2xl
                border
                border-zinc-200/80
                bg-black
                shadow-lg
                dark:border-zinc-800/80
            "
                        >

                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="
                    h-full
                    w-full
                    object-cover
                "
                            />


                            {/* Your Name */}

                            <div
                                className="
                    absolute
                    bottom-3
                    left-3
                    rounded-xl
                    border
                    border-white/10
                    bg-black/50
                    px-3
                    py-2
                    backdrop-blur-md
                "
                            >

                                <span
                                    className="
                        text-xs
                        font-semibold
                        text-zinc-100
                    "
                                >
                                    {interviewieName?.length
                                        ? interviewieName
                                        : "You"}
                                </span>

                            </div>


                            {/* Camera Label */}

                            <div
                                className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-black/50
                    px-3
                    py-1.5
                    text-[10px]
                    font-medium
                    text-zinc-300
                    backdrop-blur-md
                "
                            >
                                Your Camera
                            </div>

                        </div>


                        {/* =====================================
    QUESTION & ANSWER CONTAINER
===================================== */}

                        <div
                            className="
                            max-w-full
        col-span-2
        min-h-0
        overflow-y-auto
        rounded-2xl
        border
        border-slate-400
        bg-white
        p-4
        shadow-lg
        dark:border-slate-700
        dark:bg-black
        sm:p-5
    "
                        >

                            <h2
                                className="
            text-lg
            font-semibold
            text-slate-800
            dark:text-white
        "
                            >
                                Questions & Answers
                            </h2>


                            {/* Q&A List */}

                            <div className="mt-4 space-y-4">

                                {interviewQA.map((qa, index) => (

                                    <div
                                        key={index}
                                        className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-4
                        dark:border-slate-800
                        dark:bg-zinc-900
                    "
                                    >

                                        {/* =====================
                        QUESTION
                    ===================== */}

                                        <div className="max-w-full mb-4">

                                            <div className="mb-2 flex items-center gap-2">

                                                <div className="h-2 w-2 rounded-full bg-indigo-500" />

                                                <span
                                                    className="
                                    text-xs
                                    font-semibold
                                    text-indigo-500
                                "
                                                >
                                                    Anna
                                                </span>

                                            </div>


                                            <p
                                                className="
                                text-sm
                                font-medium
                                leading-relaxed
                                text-slate-800
                                dark:text-white
                            "
                                            >
                                                {qa.question}
                                            </p>

                                        </div>


                                        {/* =====================
                        ANSWER
                    ===================== */}

                                        <div
                                            className="
                            border-t
                            border-slate-200
                            pt-4
                            dark:border-slate-800
                        "
                                        >

                                            <div className="mb-2 flex items-center gap-2">

                                                <div className="h-2 w-2 rounded-full bg-green-500" />

                                                <span
                                                    className="
                                    text-xs
                                    font-semibold
                                    text-green-500
                                "
                                                >
                                                    Your Answer
                                                </span>

                                            </div>


                                            <p
                                                className="
                                text-sm
                                leading-relaxed
                                text-slate-600
                                dark:text-slate-300
                            "
                                            >
                                                {qa.answer === "Unavailable" ? "Answer the question" : qa.answer}
                                            </p>

                                        </div>

                                    </div>

                                ))}


                                {/* No completed Q&A */}

                                {interviewQARef.current.length === 0 && (

                                    <div
                                        className="
                    flex
                    min-h-32
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-slate-300
                    dark:border-slate-700
                "
                                    >

                                        <p className="text-sm text-slate-400">
                                            Questions and answers will appear here...
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>
                </main>



                {/* =========================================
                BOTTOM CONTROL BAR
            ========================================= */}

                <footer
                    className="
                    flex
                    h-20
                    shrink-0
                    items-center
                    justify-center
                    border-t
                    border-zinc-200/80
                    bg-[#EEE9DF]
                    px-3
                    dark:border-zinc-800/80
                    dark:bg-zinc-950
                "
                >

                    <div
                        className="
                        flex
                        max-w-full
                        items-center
                        gap-2
                        overflow-x-auto
                        sm:gap-3
                    "
                    >

                        {/* Interview timer */}

                        <div
                            className="
                            mr-1
                            hidden
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white/70
                            px-3
                            py-2
                            sm:flex
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        "
                        >

                            <Timer
                                size={15}
                                className="
                                text-indigo-500
                                dark:text-indigo-400
                            "
                            />

                            <span
                                className="
                                text-xs
                                font-semibold
                                tabular-nums
                                text-zinc-700
                                dark:text-zinc-300
                            "
                            >
                                {formatTime(elapsedTime)}
                            </span>

                        </div>


                        {/* Recording status */}

                        <div
                            className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white/70
                            px-3
                            py-2
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        "
                        >

                            {!loading && (
                                <CircleStop
                                    size={15}
                                    className="text-red-500"
                                />
                            )}


                            <span
                                className="
                                hidden
                                text-xs
                                font-medium
                                text-zinc-600
                                sm:block
                                dark:text-zinc-400
                            "
                            >
                                {loading
                                    ? "Starting"
                                    : "Recording"}
                            </span>

                        </div>


                        {/* Divider */}

                        <div
                            className="
                            mx-1
                            hidden
                            h-7
                            w-px
                            shrink-0
                            bg-zinc-200
                            sm:block
                            dark:bg-zinc-800
                        "
                        />


                        {/* Interview panel */}

                        <button
                            type="button"
                            className="
                            flex
                            h-10
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white/70
                            px-3
                            text-zinc-600
                            transition
                            hover:bg-white
                            hover:text-zinc-900
                            dark:border-zinc-800
                            dark:bg-zinc-900
                            dark:text-zinc-400
                            dark:hover:bg-zinc-800
                            dark:hover:text-zinc-100
                        "
                        >

                            <PanelRight size={17} />

                            <span
                                className="
                                hidden
                                text-xs
                                font-semibold
                                sm:block
                            "
                            >
                                Interview Panel
                            </span>

                        </button>


                        {/* End interview */}

                        <button
                            disabled={!interviewActive}
                            type="button"
                            onClick={endInterview}
                            className="
                            flex
                            h-10
                            shrink-0
                            cursor-pointer
                            items-center
                            gap-2
                            rounded-xl
                            bg-indigo-500
                            px-4
                            text-xs
                            font-bold
                            text-white
                            shadow-sm
                            transition

                            hover:bg-indigo-600
                            hover:shadow-md

                            active:scale-[0.99]

                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                        >

                            <PhoneOff size={16} />

                            <span>
                                End Interview
                            </span>

                        </button>

                    </div>

                </footer>

            </>
            )}

        </section>
    );
};

export default InterviewScreen;