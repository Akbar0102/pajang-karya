import React from "react";
import { Menu } from "./menu.jsx";
import { headers } from "next/headers";

export const DashboardTemplate = ({ children }) => {
  const headersList = headers();
  const role = headersList.get("middlewareSet");

  return (
    <main className="flex h-screen">
      <Menu role={role} />
      <section className="w-[calc(100vw-230px)] p-8">
        <div className="max-w-5xl m-auto">{children}</div>
      </section>
    </main>
  );
};
