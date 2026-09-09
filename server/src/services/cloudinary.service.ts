import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import type { UploadApiResponse } from "cloudinary";

export const uploadResume = (
    buffer: Buffer
): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "resumes",
                resource_type: "raw",
            },
            (error, result) => {
                if (error) return reject(error);

                if (!result) {
                    return reject(new Error("Upload failed"));
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export const deleteResume = async (publicId: string): Promise<boolean | null> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    if (result.result !== "ok") {
        console.error(`Failed to delete resume from Cloudinary: ${result.result}`);
        return null;
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};


export const uploadInterviewVideo = (
    file: Express.Multer.File
): Promise<{
    secure_url: string;
    public_id: string;
}> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: "interviews",
                format: "webm",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (!result) {
                    return reject(
                        new Error("Cloudinary upload failed")
                    );
                }

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(uploadStream);
    });
};