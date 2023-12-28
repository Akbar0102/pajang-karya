import { Card, CardBody } from "@nextui-org/react";
import React from "react";

export const Dashboard = ({ role }) => {
  return (
    <main className="space-y-8">
      <section>
        <h2>Dashboard</h2>
        <p>Here you can see the overview of your account.</p>
      </section>
      {role === "expert" && (
        <>
          <section className="grid grid-cols-3 gap-6">
            <Card shadow="sm">
              <CardBody className="p-8 space-y-4">
                <h6>Reviewed Project</h6>
                <h1>0</h1>
              </CardBody>
            </Card>
          </section>
        </>
      )}
    </main>
  );
};
