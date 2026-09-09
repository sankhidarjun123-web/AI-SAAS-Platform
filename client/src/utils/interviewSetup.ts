/*========================FUNCTION TO MANAGE THE INTERVIEW RECORDING================================================*/
// this function starts the recording as soon as the user visits the site
// it fetches the current stream and starts the recording and displaying

import type { SetStateAction } from "react";

// the video of the user being recorded and also adding the recorded data to the recorder
export const startRecording = (
    streamRef: React.RefObject<MediaStream | null>, 
    recordedChunksRef: React.RefObject<Blob[]>, 
    mediaRecorderRef: React.RefObject<MediaRecorder | null>, 
    setIsRecording: React.Dispatch<SetStateAction<boolean>>
) => {

    const stream = streamRef.current;

    if (!stream) {
        console.error(
            "Camera/microphone stream is not available"
        );
        return;
    }

    recordedChunksRef.current = [];

    // making a media recorder and attaching it with the current media recorder ref
    const recorder = new MediaRecorder(
        stream,
        {
            mimeType:
                "video/webm;codecs=vp8,opus",
        }
    );

    recorder.ondataavailable = (event) => {

        if (event.data.size > 0) {
            recordedChunksRef.current.push(
                event.data
            );
        }
    };

    recorder.onstop = () => {

        const blob = new Blob(
            recordedChunksRef.current,
            {
                type: "video/webm",
            }
        );

        console.log(
            "Interview recording created:",
            blob
        );

        console.log(
            "Recording size:",
            blob.size
        );

        // Upload this blob to the backend
        // after the interview.
    };

    mediaRecorderRef.current = recorder;

    recorder.start(1000);

    setIsRecording(true);

    console.log(
        "Interview recording started"
    );
};


// function to stop the recording of the interview
export const stopRecording = (
    mediaRecorderRef: React.RefObject<MediaRecorder | null>, 
    recordedChunksRef: React.RefObject<Blob[]>
): Promise<Blob | null> => {

    return new Promise((resolve) => {

        const recorder =
            mediaRecorderRef.current;

        if (!recorder) {
            resolve(null);
            return;
        }

        recorder.onstop = () => {

            const blob = new Blob(
                recordedChunksRef.current,
                {
                    type: "video/webm",
                }
            );

            console.log(
                "Interview recording created:",
                blob
            );

            console.log(
                "Recording size:",
                blob.size
            );

            resolve(blob);
        };

        if (
            recorder.state !== "inactive"
        ) {

            recorder.stop();

        } else {

            resolve(null);
        }
    });
};


/*=============INTERVIEW AUDIO FUNCTIONS====================*/
// the function to store the recorded voice of the user from the speaker from the stream available
// update the isSpeaking state accordingly
export const startSpeakingDetection = async (
    streamRef: React.RefObject<MediaStream | null>, 
    speakingAudioContextRef: React.RefObject<AudioContext | null>, 
    analyserRef: React.RefObject<AnalyserNode | null>, 
    interviewEndedRef: React.RefObject<boolean>, 
    setIsSpeaking: React.Dispatch<SetStateAction<boolean>>, 
    speakingAnimationRef: React.RefObject<number | null>
) => {

    const stream = streamRef.current;

    if (!stream) {
        console.error(
            "Cannot start speaking detection: stream unavailable"
        );
        return;
    }

    const audioContext =
        new AudioContext();

    await audioContext.resume();

    speakingAudioContextRef.current =
        audioContext;

    const source =
        audioContext.createMediaStreamSource(
            stream
        );

    const analyser =
        audioContext.createAnalyser();

    analyser.fftSize = 512;

    analyser.smoothingTimeConstant = 0.8;

    source.connect(analyser);

    analyserRef.current =
        analyser;

    const data =
        new Uint8Array(
            analyser.fftSize
        );

    // nested function to update the state for the isSpeaking state
    const detectSpeaking = () => {

        if (interviewEndedRef.current) {
            return;
        }

        analyser.getByteTimeDomainData(
            data
        );

        let sum = 0;

        for (
            let i = 0;
            i < data.length;
            i++
        ) {

            const normalized =
                (data[i] - 128) / 128;

            sum +=
                normalized *
                normalized;
        }

        const rms =
            Math.sqrt(
                sum / data.length
            );

        setIsSpeaking(
            rms > 0.035
        );

        speakingAnimationRef.current =
            requestAnimationFrame(
                detectSpeaking
            );
    };

    detectSpeaking();
};

// function to detect when user stopped speaking and update the state
// isSpeaking accordingly
export const stopSpeakingDetection = (
    speakingAnimationRef: React.RefObject<number | null>, 
    speakingAudioContextRef: React.RefObject<AudioContext | null>, 
    analyserRef: React.RefObject<AnalyserNode | null>, 
    setIsSpeaking: React.Dispatch<SetStateAction<boolean>>
) => {

    if (
        speakingAnimationRef.current !== null
    ) {

        cancelAnimationFrame(
            speakingAnimationRef.current
        );

        speakingAnimationRef.current =
            null;
    }

    if (
        speakingAudioContextRef.current
    ) {

        speakingAudioContextRef.current
            .close();

        speakingAudioContextRef.current =
            null;
    }

    analyserRef.current = null;

    setIsSpeaking(false);
};