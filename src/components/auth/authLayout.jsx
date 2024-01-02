import React from "react";

export const AuthLayout = ({ children }) => {
  return (
    <main className="grid lg:grid-cols-2 h-screen grid-cols-1">
      <section className="hidden lg:flex bg-gradient-to-br from-primary-500 to-primary-700" />
      <section className="flex justify-center items-center space-x-3">{children}</section>
    </main>
  );
};
