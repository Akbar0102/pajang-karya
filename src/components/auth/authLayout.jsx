import React from "react";

export const AuthLayout = ({ children }) => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <section className="bg-gradient-to-br from-primary-500 to-primary-700" />
      <section className="flex justify-center items-center">{children}</section>
    </main>
  );
};
