"use client"

import React, { useState, useEffect } from "react";
import { imageUrl } from "@/config/apiUrl";
import { Image, Button } from "@nextui-org/react";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const DetailProject = ({ projectData, review }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(review);

  useEffect(() => {
    setAsked(review);
  }, [review]);

  async function handleAsk() {
    setLoading(true);
    const token = Cookies.get("token");

    const projectId = projectData.id;
    const requestData = {
      projectId: projectId,
      userId: "8f20bcab-7a1c-41dd-8a0c-a9877cd5fd15"
    };

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(requestData),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    toast.success(message);
    setLoading(false);

    if (res.status === 201) {
      router.refresh()
    }
  }

  return (
    <main className="space-y-8">
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h3>{projectData.name}</h3>
          <p>Here is detail your project.</p>
        </div>
        <Button
          color="primary"
          onClick={handleAsk}
          isDisabled={asked}
          isLoading={loading}
        >
          {asked ? "Already asked to review" : "Asked to review"}
        </Button>
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
      </section>
    </main>
  );
};
