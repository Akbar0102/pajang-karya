"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const CreateProject = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    formData.append("description", description);
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

    if (res.status === 201) {
      router.push("/dashboard/project");
    }
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
          <Input name="name" label="Name" />
          <Textarea name="description" label="Description" />
          <Input name="featuredImage" type="file" />
          <Select name="category">
            <SelectItem key="website">Website</SelectItem>
            <SelectItem key="mobile">Mobile</SelectItem>
            <SelectItem key="figma">Figma</SelectItem>
            <SelectItem key="mockups">Mockups</SelectItem>
          </Select>
          <Input name="link" label="Link" />
          <Input name="repository" label="Repository" />
          <Input name="tech" label="Tech" />
          <Button type="submit" isLoading={loading} color="primary">
            Create Project
          </Button>
        </section>
      </form>
    </main>
  );
};
