export class GeminiMicrophone {

    private audioContext: AudioContext | null = null;

    private source:
        MediaStreamAudioSourceNode | null = null;

    private processor:
        ScriptProcessorNode | null = null;

    // private stream: MediaStream | null = null;

    private session: any = null;

    private active = false;


    async start(
        stream: MediaStream,
        session: any
    ) {

        // this.stream = stream;
        this.session = session;

        this.audioContext =
            new AudioContext({
                sampleRate: 16000,
            });

        await this.audioContext.resume();


        this.source =
            this.audioContext.createMediaStreamSource(
                stream
            );


        this.processor =
            this.audioContext.createScriptProcessor(
                4096,
                1,
                1
            );


        this.active = true;


        this.processor.onaudioprocess = (
            event
        ) => {

            if (!this.active) {
                return;
            }


            const input =
                event.inputBuffer
                    .getChannelData(0);


            const pcm16 =
                this.float32ToPCM16(input);


            const base64 =
                this.arrayBufferToBase64(
                    pcm16.buffer as ArrayBuffer
                );


            this.session.sendRealtimeInput({
                audio: {
                    data: base64,
                    mimeType:
                        "audio/pcm;rate=16000",
                },
            });
        };


        this.source.connect(
            this.processor
        );

        this.processor.connect(
            this.audioContext.destination
        );
    }


    stop() {

        this.active = false;


        if (this.processor) {
            this.processor.disconnect();
            this.processor = null;
        }


        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }


        if (this.audioContext) {

            this.audioContext.close();

            this.audioContext = null;
        }
    }


    private float32ToPCM16(
        input: Float32Array
    ): Int16Array {

        const output =
            new Int16Array(
                input.length
            );


        for (
            let i = 0;
            i < input.length;
            i++
        ) {

            const sample =
                Math.max(
                    -1,
                    Math.min(1, input[i])
                );


            output[i] =
                sample < 0
                    ? sample * 32768
                    : sample * 32767;
        }


        return output;
    }


    private arrayBufferToBase64(
        buffer: ArrayBuffer
    ): string {

        const bytes =
            new Uint8Array(buffer);

        let binary = "";

        const chunkSize = 0x8000;


        for (
            let i = 0;
            i < bytes.length;
            i += chunkSize
        ) {

            const chunk =
                bytes.subarray(
                    i,
                    Math.min(
                        i + chunkSize,
                        bytes.length
                    )
                );

            binary += String.fromCharCode(
                ...chunk
            );
        }


        return btoa(binary);
    }
}