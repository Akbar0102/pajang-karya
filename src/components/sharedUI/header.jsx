import { Button, Image, Avatar } from "@nextui-org/react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { LogoutButton } from "./logoutButton.jsx";

export const Header = () => {
  const token = cookies().get("token")?.value;
  let parsedPayload;

  if (token) {
    const headersList = headers();
    const payload = headersList.get("middlewareSet");
    parsedPayload = JSON.parse(payload);
  }

  return (
    <header className=" flex items-center flex-wrap justify-between mx-[100px] my-9 gap-y-5">
      <div className=" w-full sm:w-1/2">
        <div className=" flex items-center justify-center sm:justify-start gap-2">
          <Image alt="logo" src="/icon/logo.svg" width={23} height={26} />
          <Link href="/" className=" text-violet text-2xl font-semibold">
            Pakarya
          </Link>
        </div>
      </div>

      <div className=" flex items-center justify-evenly w-full sm:justify-end sm:w-1/2 gap-0.5">
        {token ? (
          // Tampilkan tombol Logout jika token ada (pengguna sudah login)
          <div className="flex gap-5 items-center">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Avatar name={parsedPayload.firstName} radius="full" />
              </Link>
            </div>
            <LogoutButton />
          </div>
        ) : (
          // Tampilkan tombol Login dan Sign up jika token tidak ada (pengguna belum login)
          <>
            <Link href="/login">
              <Button className="font-medium text-base hover:text-[#565564] py-3 px-6 bg-white text-black-100">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-medium text-base hover:bg-[#565564] py-3 px-6 bg-slate-900 text-white">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
