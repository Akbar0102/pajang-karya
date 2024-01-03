"use client";
import { apiUrl } from "@/config/apiUrl";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const CreateComment = ({ projectId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmitComment() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/comments`, {
        method: "POST",
        body: JSON.stringify({ projectId, content }),
      });

      const { message, errorMessage } = await res.json();
      if (errorMessage) {
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      if (res.ok) {
        toast.success(message);
        setContent("");
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-12 gap-y-6 mb-[120px] mt-[30px]">
      <div className="space-y-3">
        <div>
          <p className="text-base font-bold">
            Leave some feedback on this solution
          </p>
          <p className="text-base italic">
            Please focus on giving high-quality, helpful feedback and answering
            any questions Ebee02 might have. Here are some key points to
            consider:
          </p>
        </div>
        <div className="ml-4">
          <ul className="list-disc text-sm italic">
            <li>Does the solution include semantic HTML?</li>
            <li>Is it accessible, and what improvements could be made?</li>
            <li>Does the layout look good on a range of screen sizes?</li>
            <li>Is the code well-structured, readable, and reusable?</li>
          </ul>
        </div>
        <p className="text-base italic">
          You can read our community guidelines if you're unsure what to post.
        </p>
      </div>
      <div className="space-y-4">
        <Textarea
          className=" rounded-3xl sm:w-[60%] w-full"
          variant="bordered"
          placeholder="Write a comment..."
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Button
          type="submit"
          className=" text-white text-2xl font-medium bg-violet px-6 py-[14px] w-full sm:w-fit"
          onClick={handleSubmitComment}
          isLoading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
