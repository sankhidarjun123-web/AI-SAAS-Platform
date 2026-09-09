import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { uploadResume } from "../../api/resume.api";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DropResume: React.FC = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF resumes are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("resume", file);
    setLoading(true);
    try {

        const analysis = await uploadResume(formData);

        navigate(`/resume-review/${analysis?.resumeId}`);
    } catch (err) {
        console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 px-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`w-full max-w-3xl rounded-3xl border-2 border-dashed cursor-pointer overflow-hidden transition-all duration-300 shadow-lg
        bg-white dark:bg-zinc-900
        border-gray-300 dark:border-zinc-700
        ${
          dragging
            ? "scale-[1.02] bg-gray-100 dark:bg-zinc-800"
            : "hover:bg-gray-100 dark:hover:bg-zinc-800"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-8">
            <div className="bg-gray-200 dark:bg-zinc-800 p-6 rounded-full mb-6">
              <UploadCloud
                size={52}
                className="text-gray-700 dark:text-gray-300"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Your Resume
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              Drag & drop your resume here, or click anywhere inside this area
              to browse your computer.
            </p>

            <div className="mt-8 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-semibold shadow-md transition hover:opacity-90">
              Choose PDF
            </div>

            <p className="mt-5 text-sm text-gray-400 dark:text-gray-500">
              PDF only • Maximum file size: 5MB
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-zinc-700">
              <div className="flex items-center gap-5">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
                  <FileText
                    size={38}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white break-all">
                    {file.name}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                disabled={loading}
                className="p-3 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition cursor-pointer"
              >
                <X
                  size={22}
                  className="text-red-500 dark:text-red-400"
                />
              </button>
            </div>

            <div className="p-8">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit();
                }}
                disabled={loading}
                className={`w-full bg-black dark:bg-white text-white dark:text-black py-3 ${loading && "bg-slate-700 dark:bg-slate-300"} rounded-xl font-semibold shadow-md transition hover:opacity-90 cursor-pointer`}
              >
                {loading ? "Analyzing..." : "Submit Resume"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropResume;