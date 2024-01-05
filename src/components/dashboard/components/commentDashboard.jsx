"use client";

import React from "react";
import { CommentTable } from "./commentTable.jsx";


export const CommentDashboard = ({ commentsData }) => {
  return (
    <main>
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold ">Comments</h1>
          <p>This is all comments on your project.</p>
        </div>
      </section>

      <div className="mt-12">
        <CommentTable commentsData={commentsData} />
      </div>
    </main>
  );
};
