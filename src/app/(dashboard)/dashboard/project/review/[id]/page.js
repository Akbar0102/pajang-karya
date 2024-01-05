import { ReviewProjectDashboard } from "@/components/dashboard/components/review/components/reviewProjectDashboard.jsx";
import React from "react";
import { apiUrl } from "@/config/apiUrl";

async function getReview(id) {
  const res = await fetch(`${apiUrl}/reviews/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}


export default async function Page({ params }) {
  const { id } = params;
  const { obj } = await getReview(id);
  const modifiedData = {...obj, ...obj.user}

  return <ReviewProjectDashboard review={modifiedData}/>;
}
