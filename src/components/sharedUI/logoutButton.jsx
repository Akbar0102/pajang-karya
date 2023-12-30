"use client"

import React from "react";
import Cookies from "js-cookie";
import { Button } from "@nextui-org/react";

export const LogoutButton = () => {
  const handleLogout = () => {
    // Delete the 'token' cookie
    Cookies.remove("token");

    window.location.href = "/";
  };

  return (
    <Button
      className="font-medium text-base hover:bg-[#565564] py-3 px-6 bg-slate-900 text-white"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
