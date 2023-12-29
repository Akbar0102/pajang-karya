import React from "react";
import { apiUrl, imageUrl } from "@/config/apiUrl";
import { AllReview } from "@/components/reviews/allReview.jsx";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;

  const res = await fetch(`${apiUrl}/reviews`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { data } = await getData();

  return <AllReview reviewData={data}/>;
}
