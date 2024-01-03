import { Challenge } from '@/components/dashboard/components/challengeDashboard'
import React from 'react'
import { apiUrl } from "@/config/apiUrl";
import { headers } from "next/headers";

async function getData(parsedPayload) {
  const res = await fetch(`${apiUrl}/challenges`, {
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

  return (
    <Challenge challengesData={data}/>
  )
}
