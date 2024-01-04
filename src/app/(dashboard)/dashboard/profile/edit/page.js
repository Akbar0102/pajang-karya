import { UserProfileEdit } from "@/components/dashboard/components/userProfileEdit.jsx";
import React from "react";
import { headers } from "next/headers";
import { apiUrl } from "@/config/apiUrl";

async function getData(id) {
  const res = await fetch(`${apiUrl}/users/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const headersList = headers();
  const payload = headersList.get("middlewareSet");
  const parsedPayload = JSON.parse(payload);
  const { data } = await getData(parsedPayload.id);

  return <UserProfileEdit payload={data} />;
}
