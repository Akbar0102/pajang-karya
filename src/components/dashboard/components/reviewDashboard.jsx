import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { ReviewTable } from "./reviewTable.jsx";

export const ReviewDashboard = ({ reviewsData }) => {
  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Review</h1>
        <p>ask expert to review your code.</p>
      </section>

      <div className="mt-12">
        <ReviewTable reviewsData={reviewsData} />
      </div>
    </main>
  );
};
