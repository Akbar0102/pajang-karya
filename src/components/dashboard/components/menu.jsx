"use client"

import React from "react";
import Link from "next/link";
import { Activity, Box, LayoutList } from "lucide-react";
import Cookies from "js-cookie";
import { useAtom } from 'jotai';
import { roleAtom } from "../atom/dashboardAtom.js";

export const Menu = ({role}) => {
  const [roles, setRoles] = useAtom(roleAtom);
  setRoles(role)

  const handleLogout = () => {
    // Delete the 'token' cookie
    Cookies.remove("token");

    // Redirect to the login page or other suitable page
    window.location.href = "/login";
  };

  return (
    <aside className="w-[230px] border-r-2 p-8 flex flex-col justify-between">
      <div>
        <Link className="menu" href="/dashboard">
          <Activity size={15} />
          Dashboard
        </Link>
        {role === "expert" && (
          <>
            <Link className="menu" href="/dashboard/reviews">
              <LayoutList size={15} />
              Reviews
            </Link>
          </>
        )}
        {role === "beginner" && (
          <>
            <Link className="menu" href="/dashboard/basics">
              <Box size={15} />
              Project
            </Link>
            <Link className="menu" href="/dashboard/tutorials">
              <Box size={15} />
              Challenge
            </Link>
          </>
        )}
      </div>
      <div className="menu" onClick={handleLogout}>Logout</div>
    </aside>
  );
};
