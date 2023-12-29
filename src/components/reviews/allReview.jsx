"use client";

import React from "react";
import { useAtom } from "jotai";
import { roleAtom } from "../dashboard/atom/dashboardAtom.js";
import { ReviewCard } from "./reviewCard.jsx";

export const AllReview = ({ reviewData }) => {
  const [role, setRole] = useAtom(roleAtom);

  return (
    <>
      <main className="space-y-8">
        <section>
          <h2>My Reviews</h2>
          <p>Here you can see requested review for you.</p>
        </section>
        <section className="grid grid-cols-4 gap-6">
          {reviewData &&
            reviewData.map(({ id, status, project }) => {
              return (
                <ReviewCard
                  key={id}
                  id={project.id}
                  featuredImage={project.featuredImage}
                  name={project.name}
                  slug={project.slug}
                  username={project.user.username}
                />
              );
            })}
        </section>
      </main>
    </>
  );
};
