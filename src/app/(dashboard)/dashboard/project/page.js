import React from "react";
import { ProjectDashboard } from "@/components/dashboard/components/projectDashboard.jsx";
import { apiUrl } from "@/config/apiUrl";
import { headers } from "next/headers";

async function getData(parsedPayload) {
  const { username } = parsedPayload;
  const res = await fetch(`${apiUrl}/users?username=${username}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const headersList = headers();
  const payload = headersList.get("middlewareSet");
  const parsedPayload = JSON.parse(payload);
  
  const { data } = await getData(parsedPayload);
  const { project } = data;

  return <ProjectDashboard projectsData={project} />;
}
