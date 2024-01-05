import { DashTemplate } from '@/components/dashboard/components/dashTemplate'
import React from 'react'
import { apiUrl } from "@/config/apiUrl";
import { headers } from "next/headers";

async function getData(parsedPayload) {
  const { id } = parsedPayload;
  const res = await fetch(`${apiUrl}/users/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({children}) {
  const headersList = headers();
  const payload = headersList.get("middlewareSet");
  const parsedPayload = JSON.parse(payload);

  const { data } = await getData(parsedPayload);

  return (
    <DashTemplate user={data}>{children}</DashTemplate>
  )
}
