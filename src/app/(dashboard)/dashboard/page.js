import React from "react";
import { headers } from "next/headers";
import { Dashboard } from "@/components/dashboard/components/dashboard.jsx";

export default function Page() {
  const headersList = headers();
  const role = headersList.get("middlewareSet");

  return <Dashboard role={role} />;
}
