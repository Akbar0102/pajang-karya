import React from "react";
import { apiUrl } from "@/config/apiUrl";
import { CommentDashboard } from "@/components/dashboard/components/commentDashboard.jsx";

async function getData(id) {
  const res = await fetch(`${apiUrl}/projects/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

const extractUserValues = (item) => {
  const { user, ...rest } = item;
  return {
    ...rest,
    userId: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getData(id);
  const comment = data.comment;
  const modifiedData = comment.map((item) => extractUserValues(item));

  return <CommentDashboard commentsData={modifiedData} />;
}
