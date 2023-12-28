import React from "react";
import { headers } from "next/headers";
import { AllReview } from "@/components/reviews/allReview.jsx";

export default function Page() {
  const headersList = headers();
  const role = headersList.get("middlewareSet");

  return <AllReview role={role} />;
}
