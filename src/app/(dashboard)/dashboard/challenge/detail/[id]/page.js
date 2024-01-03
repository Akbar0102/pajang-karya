import { ChallengeDetail } from "@/components/challenge/challengeDetail.jsx";
import React from "react";
import { apiUrl } from "@/config/apiUrl";

async function getData(id) {
  const res = await fetch(`${apiUrl}/challenges/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getData(id);

  return <ChallengeDetail challengeData={data}/>;
}
