"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "@ppp/components/Footer";
import Header from "@ppp/components/Header";
import LoadingDots from "@ppp/components/LoadingDots";
import ResizablePanel from "@ppp/components/ResizablePanel";
import { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

interface RecommendationsResponse {
  recommendations: string[];
}

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ref = useRef(null);

  async function findRecommendations(file: File) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else return response.json();
      })
      .then(({ recommendations }: RecommendationsResponse) => {
        setRecommendations(recommendations);
      })
      .catch((error: Error) => setError(error.message));

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Header />
      <main className="mb-8 mt-4 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mb-0">
        <h1 className="font-display mx-auto mb-10 max-w-4xl text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl">
          Find a recommendation <span className="text-blue-600">based</span> on
          your picture
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex w-full flex-col items-center justify-between">
              {originalPhoto && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="mx-auto h-96 rounded-2xl"
                  width={475}
                  height={475}
                />
              )}
              {loading && (
                <button
                  disabled
                  className="mt-8 w-40 rounded-full bg-blue-500 px-4 pb-3 pt-2 font-medium text-white"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error ? (
                <div
                  className="mt-8 max-w-[575px] rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
                    Please try again later.
                  </div>
                  <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              ) : recommendations ? (
                <aside className="relative w-full" ref={ref}>
                  <motion.ul
                    whileTap={{ cursor: "grabbing" }}
                    dragConstraints={ref}
                    draggable
                    drag="x"
                    className="flex w-max gap-5 px-96 py-16 hover:cursor-grab"
                  >
                    {recommendations.map((image, index) => (
                      <Image
                        key={index}
                        alt={`img-${index}`}
                        src={image}
                        className="!relative max-h-96 min-h-[10rem] cursor-default rounded-2xl"
                        fill
                      />
                    ))}
                  </motion.ul>
                </aside>
              ) : (
                <UploadDropZone upload={findRecommendations} />
              )}
              <div className="flex justify-center space-x-2">
                {(recommendations || error) && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRecommendations(null);
                      setLoading(false);
                      setError(null);
                    }}
                    className="mt-8 rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-500/80"
                  >
                    Generate New Pictures
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </div>
  );
};

function UploadDropZone({
  upload,
}: {
  upload: (file: File) => void | Promise<void>;
}) {
  const [file, setFile] = useState<File & { preview: string }>();
  const [status, setStatus] = useState<"default" | "rejected" | "accepted">(
    "default"
  );
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) =>
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      ),
    onDropAccepted: () => setStatus("accepted"),
    onDropRejected: () => setStatus("rejected"),
  });

  return (
    <section className="mx-20 h-full w-full overflow-hidden">
      <div
        {...getRootProps({
          className: `dropzone w-full h-full rounded-xl cursor-pointer px-20 ${
            status === "default"
              ? "border-2 border-dashed border-gray-50 focus:border-blue-400 focus:bg-blue-50/10"
              : status === "rejected"
              ? "border-2 border-solid bg-red-50/10 border-red-400"
              : "border-2 border-solid bg-green-50/10 border-green-300"
          }`,
        })}
      >
        <input {...getInputProps()} />
        {file === undefined ? (
          <p className="my-20">{`Drag 'n' drop some files here, or click to select files`}</p>
        ) : (
          <div className="relative m-2">
            <Image
              className="!relative max-h-96 object-contain"
              alt="original image"
              src={file.preview}
              fill
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
            <button
              onClick={(event) => {
                event.stopPropagation();
                setFile(undefined);
                setStatus("default");
              }}
              className="mx-auto my-4 block rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-500/80"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {status === "accepted" && file !== undefined && (
        <button
          onClick={() => upload(file)}
          className="mx-auto my-4 block rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-500/80"
        >
          Get recommendations
        </button>
      )}
    </section>
  );
}

export default Home;
