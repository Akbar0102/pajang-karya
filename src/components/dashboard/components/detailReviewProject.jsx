"use client";

import React, { useState, useEffect } from "react";
import { imageUrl } from "@/config/apiUrl";
import { Image, Button } from "@nextui-org/react";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillWrapper = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    return (props) => <ReactQuill {...props} />;
  },
  {
    ssr: false,
  }
);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: ["normal"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const DetailReviewProject = ({ projectData, reviewId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  function appreciateConfetti() {
    const myCanvas = document.createElement("canvas");
    myCanvas.style.position = "fixed";
    myCanvas.style.inset = 0;
    myCanvas.style.width = "100vw";
    myCanvas.style.height = "100vh";
    myCanvas.style.zIndex = -1;
    document.body.appendChild(myCanvas);

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 100,
      spread: 160,
    });
  }

  async function handleSubmitReview() {
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "PUT",
      body: JSON.stringify({ id: reviewId, review: content }),
    });

    setLoading(false);
    appreciateConfetti();

    setTimeout(() => {
      if (res.status === 200) {
        router.refresh();
        router.push("/dashboard/review");
      }
    }, 1000);
  }

  return (
    <main className="space-y-8">
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h3>{projectData.name}</h3>
          <p>Here is detail project to be reviewed.</p>
        </div>
      </section>
      <Image
        className=" mt-16 rounded-3xl"
        alt="project-featured-image"
        src={`${imageUrl}/projects/tr:w-856,h-572,c-at_max/${projectData.id}/${projectData.featuredImage}`}
      />
      <section className="space-y-4">
        <h4 className=" text-black-50 font-semibold mb-2">Description</h4>
        <div>{parse(projectData.description)}</div>

        <h4 className=" text-black-50 font-semibold mb-2">Category</h4>
        <p>{projectData.category}</p>

        <h4 className=" text-black-50 font-semibold mb-2">Link</h4>
        <p>{projectData.link}</p>

        <h4 className=" text-black-50 font-semibold mb-2">Repository</h4>
        <p>{projectData.repository}</p>

        <h4 className=" text-black-50 font-semibold mb-2">Tech</h4>
        <p>{projectData.tech}</p>

        <h2 className=" text-black-50 font-semibold mb-2">Add Review</h2>
        <QuillWrapper
          modules={modules}
          onChange={setContent}
          theme="snow"
          placeholder="Add an review..."
        />

        <Button
          isLoading={loading}
          color="primary"
          onClick={handleSubmitReview}
        >
          Submit Review
        </Button>
      </section>
    </main>
  );
};
