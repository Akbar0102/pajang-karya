import { UpdateProject } from "@/components/dashboard/components/updateProject.jsx";
import React from "react";
import { apiUrl } from "@/config/apiUrl";

async function getData(id) {
  const res = await fetch(`${apiUrl}/projects/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getData(id);

  return <UpdateProject projectData={data}/>;
}
