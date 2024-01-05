import { UpdateProject } from "@/components/dashboard/components/updateProject.jsx";
import React from "react";
import { apiUrl } from "@/config/apiUrl";
import { DetailReviewProject } from "@/components/dashboard/components/detailReviewProject.jsx";

async function getData(id) {
  const res = await fetch(`${apiUrl}/reviews/one/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getProject(id) {
  const res = await fetch(`${apiUrl}/projects/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getData(id);
  const { projectId } = data;
  const project = await getProject(projectId);

  return <DetailReviewProject projectData={project.data} reviewId={id}/>;
}
