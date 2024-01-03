"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ProjectTable } from "@/components/projects/projectTable.jsx";

export const ProjectDashboard = ({ projectsData }) => {
  return (
    <main>
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold ">Projects</h1>
          <p>This is overview to all of your projects.</p>
        </div>
        <Link href="/dashboard/project/add">
          <Button shadow color="primary">
            Add Project
          </Button>
        </Link>
      </section>

      <div className="mt-12">
        <ProjectTable projectsData={projectsData} />
      </div>
    </main>
  );
};
