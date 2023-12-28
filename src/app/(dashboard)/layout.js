import { DashboardTemplate } from "@/components/dashboard/components/dashboardTemplate.jsx";
import React from "react";

export default function Page({ children }) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
