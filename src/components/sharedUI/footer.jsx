import { Image, Link } from "@nextui-org/react";

export const Footer = () => {
  return (
    <footer className=" bg-black-50 h-96 flex flex-col">
      <div className=" flex items-center justify-center gap-2 mt-[100px] mb-3">
        <Image alt="logo" src="/icon/logo-white.svg" width={23} height={26} />
        <strong className=" text-white text-2xl font-semibold">Karyadev</strong>
      </div>
      <text className=" text-white-dark text-base font-normal text-center">
        Copyright © 2023.<br></br>
        All Rights Reserved.
      </text>
    </footer>
  );
};
