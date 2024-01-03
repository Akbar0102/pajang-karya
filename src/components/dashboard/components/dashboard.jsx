import { AllProjects } from "@/components/projects/allProjects";
import { Card, CardBody } from "@nextui-org/react";
import { data } from "autoprefixer";
import React from "react";

export const Dashboard = ({ countProject, countChallenge }) => {
  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Dashboard</h1>
        <p>This is your progress so far, you rock it🤟.</p>
      </section>
      <section className="grid grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>Project Count</h6>
            <h1>{countProject}</h1>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>Challenge Done</h6>
            <h1>{countChallenge}</h1>
          </CardBody>
        </Card>
      </section>
    </main>
  );
};
