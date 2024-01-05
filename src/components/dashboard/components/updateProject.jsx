"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
} from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
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

export const UpdateProject = ({ projectData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(false);
  const [content, setContent] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const ruleImage = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      setRule(true)
      event.preventDefault();
      toast.error("Please select a valid image file");
    }else{
      setRule(false)
    }
  };

  async function handleUpdateProject(event) {
    event.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");

    const formData = new FormData();

    const name = event.target.name.value;
    // const description = event.target.description.value;
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

    const res = await fetch(`/api/projects/${projectData.id}`, {
      method: "PUT",
      headers: {
        Cookie: `token=${token}`,
      },
      body: formData,
    });

    setLoading(false);
    if (res.status === 201) {
      router.refresh();
      router.push("/dashboard/project");
    }

  }

  return (
    <main className="space-y-8">
      <section>
        <div>
          <h3>Update a Project</h3>
          <p>Here you can update your project.</p>
        </div>
      </section>
      <Image
        className=" mt-16 rounded-3xl"
        alt="project-featured-image"
        src={`${imageUrl}/projects/tr:w-856,h-572,c-at_max/${projectData.id}/${projectData.featuredImage}`}
      />
      <form onSubmit={handleUpdateProject}>
        <section className="space-y-4">
          <Input name="name" label="Name" defaultValue={projectData.name} isRequired/>
          {/* <Textarea
            name="description"
            label="Description"
            defaultValue={projectData.description}
          /> */}
          <QuillWrapper modules={modules} defaultValue={projectData.description} onChange={setContent} theme="snow" />
          <Input name="featuredImage" type="file" onChange={ruleImage}/>
          <Select name="category" defaultSelectedKeys={[projectData.category]} isRequired>
            <SelectItem key="website">Website</SelectItem>
            <SelectItem key="mobile">Mobile</SelectItem>
            <SelectItem key="figma">Figma</SelectItem>
            <SelectItem key="mockups">Mockups</SelectItem>
          </Select>
          <Input name="link" label="Link" defaultValue={projectData.link} isRequired/>
          <Input
            name="repository"
            label="Repository"
            defaultValue={projectData.repository}
            isRequired
          />
          <Input name="tech" label="Tech" defaultValue={projectData.tech} isRequired/>
          <Button type="submit" isLoading={loading} color="primary" isDisabled={rule}>
            Update Project
          </Button>
        </section>
      </form>
    </main>
  );
};
