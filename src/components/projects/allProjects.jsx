import React from "react";
import { ProjectCard } from "./projectCard";

export const AllProjects = ({ projectsData }) => {
  return (
    <section className="grid justify-between  xl:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-[33px] lg:px-[px]">
      { projectsData && projectsData.map(({ id, name, featuredImage, slug, user }) => {
        return <ProjectCard key={id} id={id} featuredImage={featuredImage} name={name} slug={slug} username={user.username} />;
      })}
    </section>
  );
};