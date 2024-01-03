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

export const UpdateProject = ({ projectData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpdateProject(event) {
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
    formData.append("description", description);
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

    if (res.status === 201) {
      router.push("/dashboard/project");
    }

    setLoading(false);
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
          <Input name="name" label="Name" defaultValue={projectData.name} />
          <Textarea
            name="description"
            label="Description"
            defaultValue={projectData.description}
          />
          <Input name="featuredImage" type="file" />
          <Select name="category" defaultSelectedKeys={[projectData.category]}>
            <SelectItem key="website">Website</SelectItem>
            <SelectItem key="mobile">Mobile</SelectItem>
            <SelectItem key="figma">Figma</SelectItem>
            <SelectItem key="mockups">Mockups</SelectItem>
          </Select>
          <Input name="link" label="Link" defaultValue={projectData.link} />
          <Input
            name="repository"
            label="Repository"
            defaultValue={projectData.repository}
          />
          <Input name="tech" label="Tech" defaultValue={projectData.tech} />
          <Button type="submit" isLoading={loading} color="primary">
            Update Project
          </Button>
        </section>
      </form>
    </main>
  );
};
