"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import confetti from "canvas-confetti";
import { toast } from "react-hot-toast";
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
    // [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: ["normal"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" },
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const CreateProject = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(false);
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

  const ruleImage = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      setRule(true);
      event.preventDefault();
      toast.error("Please select a valid image file");
    } else {
      setRule(false);
    }
  };

  async function handleCreateProject(event) {
    event.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");

    const formData = new FormData();

    const name = event.target.name.value;
    const description = event.target.description.value;
    const link = event.target.link.value;
    const repository = event.target.repository.value;
    const tech = event.target.tech.value;
    const featuredImage = event.target.featuredImage.files[0];
    const category = event.target.category.value;

    formData.append("name", name);
    formData.append("description", content);
    formData.append("featuredImage", featuredImage);
    formData.append("category", category);
    formData.append("link", link);
    formData.append("repository", repository);
    formData.append("tech", tech);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      body: formData,
    });

    setLoading(false);
    appreciateConfetti();

    setTimeout(() => {
      if (res.status === 201) {
        router.push("/dashboard/project");
      }
    }, 1000);
  }

  return (
    <main className="space-y-8">
      <section>
        <div>
          <h3>Create new Project</h3>
          <p>Here you can add your new project.</p>
        </div>
      </section>
      <form onSubmit={handleCreateProject}>
        <section className="space-y-4">
          <Input name="name" label="Name" isRequired />
          {/* <Textarea name="description" label="Description" isRequired /> */}
          <QuillWrapper
            modules={modules}
            onChange={setContent}
            theme="snow"
            placeholder="Compose an epic..."
          />
          <Input
            name="featuredImage"
            type="file"
            onChange={ruleImage}
            isRequired
          />
          <Select name="category" isRequired defaultSelectedKeys={["website"]}>
            <SelectItem key="website">Website</SelectItem>
            <SelectItem key="mobile">Mobile</SelectItem>
            <SelectItem key="figma">Figma</SelectItem>
            <SelectItem key="mockups">Mockups</SelectItem>
          </Select>
          <Input name="link" label="Link" isRequired />
          <Input name="repository" label="Repository" isRequired />
          <Input name="tech" label="Tech" isRequired />
          <Button
            type="submit"
            isLoading={loading}
            color="primary"
            isDisabled={rule}
          >
            Create Project
          </Button>
        </section>
      </form>
    </main>
  );
};
