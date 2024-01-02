'use client'
import { AllProjects } from "@/components/projects/allProjects";
import { apiUrl } from "@/config/apiUrl";
import {ScrollShadow} from "@nextui-org/react";
import React from "react";


async function getData(query) {
  if (!query) {
    const res = await fetch(`${apiUrl}/projects`, { cache: 'no-cache' });
    const data = await res.json();
    return data;
  }

  const res = await fetch(`${apiUrl}/projects?q=${query}`, { cache: 'no-cache' });
  const data = await res.json();
  return data;
}

export default async function ProjectDashboard({ searchParams }) {
  const { data } = await getData(searchParams);
  return (
    <main>
       <ScrollShadow>
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Projects</h1>
        <p>This is overview to all of your projects.</p>
      </section>

        <div className="mt-12">
          <AllProjects projectsData={data}/>
        </div>
      
    </ScrollShadow>
      
    </main>
    
  )
}
