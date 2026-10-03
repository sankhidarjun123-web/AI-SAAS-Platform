import {
    getDocument,
    OPS,
    type PDFPageProxy
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "canvas";
import { PNG } from "pngjs";

import {
    type Link,
    type Image,
    type ResumePage,
    type TextContent
} from "../types/resume.types.js";


export default class ResumeExtractor {

    private resumeBuffer: Express.Multer.File | null;
    public resumePages: ResumePage[];


    constructor(resumeBuffer?: Express.Multer.File) {
        this.resumeBuffer = resumeBuffer ?? null;
        this.resumePages = [];
    }


    /**
     * Extract all information from the uploaded PDF.
     */
    public async extractInformations(): Promise<void> {

        if (!this.resumeBuffer) {
            return;
        }

        const data = new Uint8Array(this.resumeBuffer.buffer);

        const loadingTask = getDocument({
            data
        });

        const pdf = await loadingTask.promise;

        try {

            const pages = pdf.numPages;

            for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {

                const page = await pdf.getPage(pageNumber);

                const viewport = page.getViewport({
                    scale: 1
                });

                const text = await this.extractPagesTextContent(page);

                const links = await this.extractPageLinks(
                    page,
                    text
                );

                const images = await this.extractPageImages(
                    page
                );

                this.resumePages.push({
                    pageNumber,

                    width: viewport.width,
                    height: viewport.height,

                    text,

                    links,

                    images: images.length > 0
                        ? images
                        : null
                });

                page.cleanup();
            }

        } finally {

            await loadingTask.destroy();

        }
    }


    /**
     * Extract text and its positional information.
     */
    private async extractPagesTextContent(
        page: PDFPageProxy
    ): Promise<TextContent[]> {

        const textContent = await page.getTextContent();

        const texts: TextContent[] = [];

        for (const item of textContent.items) {

            if (!("str" in item)) {
                continue;
            }

            const transform = item.transform;

            texts.push({
                text: item.str,

                x: transform[4],
                y: transform[5],

                width: item.width,
                height: item.height,

                fontSize: Math.sqrt(
                    transform[0] ** 2 +
                    transform[1] ** 2
                ),

                fontName: item.fontName
            });
        }

        return texts;
    }


    /**
     * Extract hyperlinks from PDF annotations.
     */
    private async extractPageLinks(
        page: PDFPageProxy,
        texts: TextContent[]
    ): Promise<Link[]> {

        const annotations = await page.getAnnotations();

        const links: Link[] = [];

        for (const annotation of annotations) {

            if (annotation.subtype !== "Link") {
                continue;
            }

            const [
                x1,
                y1,
                x2,
                y2
            ] = annotation.rect;

            const linkText = texts
                .filter(text =>
                    text.x < x2 &&
                    text.x + text.width > x1 &&
                    text.y < y2 &&
                    text.y + text.height > y1
                )
                .map(text => text.text)
                .join("");

            links.push({
                text: linkText,

                url: annotation.url,

                x: x1,
                y: y1,

                width: x2 - x1,
                height: y2 - y1
            });
        }

        return links;
    }


    /**
     * Extract embedded raster images from the PDF.
     */
    private async extractPageImages(
        page: PDFPageProxy
    ): Promise<Image[]> {

        const operatorList = await page.getOperatorList();

        const images: Image[] = [];

        for (
            let i = 0;
            i < operatorList.fnArray.length;
            i++
        ) {

            const operator = operatorList.fnArray[i];

            if (
                operator !== OPS.paintImageXObject &&
                operator !== OPS.paintInlineImageXObject
            ) {
                continue;
            }

            const args = operatorList.argsArray[i];

            const imageId = args[0];

            let image: any = null;

            if (page.objs.has(imageId)) {

                image = page.objs.get(imageId);

            } else if (page.commonObjs.has(imageId)) {

                image = page.commonObjs.get(imageId);
            }

            if (!image) {
                continue;
            }

            if (
                !image.data ||
                !image.width ||
                !image.height
            ) {
                continue;
            }

            const width = image.width;
            const height = image.height;

            const pixelCount = width * height;

            const channels =
                image.data.length / pixelCount;

            if (
                channels !== 3 &&
                channels !== 4
            ) {
                continue;
            }

            const png = new PNG({
                width,
                height
            });

            for (
                let pixel = 0;
                pixel < pixelCount;
                pixel++
            ) {

                const sourceIndex =
                    pixel * channels;

                const targetIndex =
                    pixel * 4;

                png.data[targetIndex] =
                    image.data[sourceIndex];

                png.data[targetIndex + 1] =
                    image.data[sourceIndex + 1];

                png.data[targetIndex + 2] =
                    image.data[sourceIndex + 2];

                png.data[targetIndex + 3] =
                    channels === 4
                        ? image.data[sourceIndex + 3]
                        : 255;
            }

            const buffer = PNG.sync.write(png);

            images.push({

                id: imageId,

                x: 0,
                y: 0,

                width,
                height,

                originalWidth: width,
                originalHeight: height,

                buffer,

                mimeType: "image/png",

                imageKind: image.kind
            });
        }

        return images;
    }

    public async renderFirstPage(): Promise<Buffer> {

        if (!this.resumeBuffer) {
            throw new Error("Resume buffer is missing");
        }

        const data = new Uint8Array(this.resumeBuffer.buffer);

        const loadingTask = getDocument({
            data
        });

        const pdf = await loadingTask.promise;

        try {

            const page = await pdf.getPage(1);

            const scale = 2;

            const viewport = page.getViewport({
                scale
            });

            const canvas = createCanvas(
                Math.ceil(viewport.width),
                Math.ceil(viewport.height)
            );

            const context = canvas.getContext("2d");

            await page.render({
                canvasContext: context,
                viewport
            } as any).promise;

            const imageBuffer = canvas.toBuffer("image/png");

            return imageBuffer;

        } finally {

            await loadingTask.destroy();
        }
    }
}