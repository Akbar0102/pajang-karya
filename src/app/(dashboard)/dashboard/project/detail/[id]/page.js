import React from "react";
import { apiUrl } from "@/config/apiUrl";
import { DetailProject } from "@/components/dashboard/components/detailProject.jsx";

async function getData(id) {
  const res = await fetch(`${apiUrl}/projects/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getReview(id) {
  const res = await fetch(`${apiUrl}/reviews/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getData(id);
  const review  = await getReview(id);

  return <DetailProject projectData={data} review={review.data}/>;
}
