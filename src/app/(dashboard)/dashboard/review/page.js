import { ReviewDashboard } from "@/components/dashboard/components/reviewDashboard.jsx";
import React from "react";
import { cookies } from "next/headers";
import { apiUrl } from "@/config/apiUrl";

async function getReview(token) {
  const res = await fetch(`${apiUrl}/reviews`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

const extractProjectData = (item) => {
  const { project, status, ...rest } = item;

  let statusName = "";

  if (status === "OP") {
    statusName = "On Progress";
  } else if (status === "DONE") {
    statusName = "Reviewed";
  }

  return {
    ...rest,
    status,
    statusName,
    projectName: project.name,
    userId: project.user.id,
    username: project.user.username,
    firstName: project.user.firstName,
    lastName: project.user.lastName,
  };
};

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  
  const { data } = await getReview(token);
  const modifiedReviewsData = data.map((item) => extractProjectData(item));

  return <ReviewDashboard reviewsData={modifiedReviewsData}/>;
}
