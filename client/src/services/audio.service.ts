import type { SetStateAction } from "react";

export const playPCMChunk = async (
    setAnnaSpeaking: React.Dispatch<SetStateAction<boolean>>,
    base64Audio: string,
    audioContextRef: React.MutableRefObject<AudioContext | null>,
    nextAudioStartTimeRef: React.MutableRefObject<number>
): Promise<void> => {

    // Create AudioContext only once
    if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({
            sampleRate: 24000,
        });
    }

    const audioContext = audioContextRef.current;

    // Browser may initially suspend audio
    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }

    // Base64 → binary
    const binaryString = atob(base64Audio);

    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Binary → Int16 PCM
    const pcm16 = new Int16Array(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength / 2
    );

    // Int16 PCM → AudioBuffer
    const audioBuffer = audioContext.createBuffer(
        1,
        pcm16.length,
        24000
    );

    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < pcm16.length; i++) {
        channelData[i] = pcm16[i] / 32768;
    }

    // Create audio source
    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(audioContext.destination);

    // Anna starts speaking
    setAnnaSpeaking(true);

    // Queue chunks
    const currentTime = audioContext.currentTime;

    if (nextAudioStartTimeRef.current < currentTime) {
        nextAudioStartTimeRef.current = currentTime;
    }

    source.start(nextAudioStartTimeRef.current);

    nextAudioStartTimeRef.current += audioBuffer.duration;

    source.onended = () => {

        setTimeout(() => {

            // Only set false if no more
            // audio is queued
            if (
                audioContext.currentTime >=
                nextAudioStartTimeRef.current - 0.02
            ) {
                setAnnaSpeaking(false);
            }

        }, 30);
    }
};




export const prepareAudio = async (audioContextRef: React.MutableRefObject<AudioContext | null>) => {

    if (!audioContextRef.current) {

        audioContextRef.current =
            new AudioContext({
                sampleRate: 24000,
            });
    }

    if (
        audioContextRef.current.state ===
        "suspended"
    ) {

        await audioContextRef.current.resume();
    }
};