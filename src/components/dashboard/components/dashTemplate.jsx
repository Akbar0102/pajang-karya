import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity, Presentation, Swords } from "lucide-react";


export const DashTemplate = ({children}) => {
    return (
        <main className="flex h-screen">
      <aside className="w-[230px] border-r-2 p-8 flex flex-col justify-between">

        <div className="flex flex-col gap-12">
            <div className="flex items-center justify-between sm:justify-start gap-2">
                <Image alt="logo" src="/icon/logo.svg" width={23} height={26} />
                <Link href="/" className=" text-violet text-2xl font-semibold">
                     Pakarya
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                <Link className="h-[40px] menu flex items-center justify-center rounded-md gap-2 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white " href="/dashboard">
            <Activity size={15} />
            Dashboard
          </Link>
          <Link className="menu h-[40px] flex items-center justify-center rounded-md gap-2  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white" href="/dashboard/project">
            <Presentation  size={15} />
            My Project
          </Link>
          <Link className="menu h-[40px] flex items-center justify-center rounded-md gap-2  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring focus:bg-indigo-500 focus:text-white" href="/dashboard/challenge">
            <Swords size={15} />
            Challenge
          </Link>
            </div>
          
        </div>
        <div className="menu">Logout</div>
      </aside>
      <section className="w-[calc(100vw-230px)] p-8">
        <div className="max-w-5xl m-auto">{children}</div>
      </section>
    </main>
    )
}