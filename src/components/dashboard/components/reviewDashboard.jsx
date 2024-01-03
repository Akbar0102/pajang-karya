import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export const ReviewDashboard = () => {
  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Review</h1>
        <p>ask expert to review your code.</p>
      </section>
      <section className="grid grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>The feature is not implemented yet.</h6>
          </CardBody>
        </Card>
      </section>
    </main>
  );
};
