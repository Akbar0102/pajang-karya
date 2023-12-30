"use client";

import { useState } from "react";
import { ProjectCard } from "./projectCard";
import { Button, Image } from "@nextui-org/react";

export const AllProjects = ({ projectsData }) => {
  const [visibleProjects, setVisibleProjects] = useState(4);

  function handleLoadMore() {
    setVisibleProjects((prev) => prev + 4);
  }

  return (
    <>
      <section className="grid xl:grid-cols-4 md:grid-cols-2 gap-x-6 gap-y-[53px] lg:px-[100px]">
        {projectsData &&
          projectsData
            .slice(0, visibleProjects)
            .map(({ id, name, featuredImage, slug, user }) => {
              return (
                <ProjectCard
                  key={id}
                  id={id}
                  featuredImage={featuredImage}
                  name={name}
                  slug={slug}
                  username={user.username}
                />
              );
            })}
      </section>
      {visibleProjects < projectsData.length && (
        <Button
          radius="full"
          className="font-medium text-lg text-grey bg-white px-6 py-3.5 border-1.5 my-[53px]"
          onClick={handleLoadMore}
        >
          View More
        </Button>
      )}
    </>
  );
};
