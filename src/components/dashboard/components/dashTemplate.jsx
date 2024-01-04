"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/config/apiUrl";
import { LogoutCard } from "./logoutCard";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
} from "@nextui-org/react";
import {
  Activity,
  Presentation,
  Swords,
  FileCode,
  MenuIcon,
  SmileIcon,
} from "lucide-react";
import Cookies from "js-cookie";

export const DashTemplate = ({ children }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleLogout = () => {
    // Delete the 'token' cookie
    Cookies.remove("token");
    Cookies.remove("user");

    // Redirect to the login page or other suitable page
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    if (isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDropdownVisible]);

  return (
    <main className="flex">
      <aside className=" h-screen sticky top-0 w-[230px] border-r-2 p-8 flex flex-col justify-between">
        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <Image alt="logo" src="/icon/logo.svg" width={23} height={26} />
            <Link href="/" className=" text-violet text-2xl font-semibold">
              Pakarya
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              className="h-[40px] menu flex items-center justify-start rounded-md gap-2 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white "
              href="/dashboard"
            >
              <Activity size={15} />
              Dashboard
            </Link>
            <Link
              className="menu h-[40px] flex items-center justify-start rounded-md gap-2  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white"
              href="/dashboard/project"
            >
              <Presentation size={15} />
              My Project
            </Link>
            <Link
              className="menu h-[40px] flex items-center justify-start rounded-md gap-2  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white"
              href="/dashboard/challenge"
            >
              <Swords size={15} />
              Challenge
            </Link>
            <Link
              className="menu h-[40px] flex items-center justify-start rounded-md gap-2  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white"
              href="/dashboard/review"
            >
              <FileCode size={15} />
              Review
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
            <SmileIcon color="#3258E8" />
          </div>
          <div className="relative">
            {isDropdownVisible && (
              <div className="w-[190px] shadow-xl bg-background-900/20 rounded-lg absolute bottom-12 right-0">
                <a href="/dashboard/profile/edit">
                  <button className="border-background-400 disabled:opacity-40 disabled:cursor-wait w-full shadow-black/20 font-medium tracking-tight rounded-lg transition duration-300 ease-in-out bg-transparent shadow-none border-0  hover:bg-indigo-500 hover:text-white flex gap-3 items-center justify-start py-2 px-4">
                    Edit Profile
                  </button>
                </a>
                <button
                  className="border-background-400 disabled:opacity-40 disabled:cursor-wait w-full shadow-black/20 font-medium tracking-tight rounded-lg transition duration-300 ease-in-out bg-transparent shadow-none border-0 hover:bg-indigo-500 hover:text-white flex gap-3 items-center justify-start py-2 px-4"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
            <button
              className="border-1.5 border-background-400 disabled:opacity-40 disabled:cursor-wait bg-transparent shadow-md shadow-black/20 font-medium tracking-tight rounded-lg transition duration-300 ease-in-out bg-gradient-to-b from-background-950 to-background-900/10 hover:border-background-200 hover:text-background-200 active:opacity-80 text-zinc-400 w-fit p-2"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <MenuIcon size={15} />
            </button>
          </div>
        </div>
        {/* <div>
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <User
                as="button"
                name={username}
                description={about}
                className="transition-transform"
                avatarProps={`${imageUrl}/projects/tr:w-300,h-200,c-at_max/${id}/${featuredImage}`}
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <LogoutCard />
            </PopoverContent>
          </Popover>
        </div> */}
      </aside>

      <section className=" col-span-3 w-[calc(100vw-230px)] p-8">
        <div className="max-w-5xl m-auto">{children}</div>
      </section>
    </main>
  );
};
