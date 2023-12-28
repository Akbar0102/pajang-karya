import { Button, Image } from "@nextui-org/react"
import Link from "next/link"

export const Header = () => {
    return (
        <header className=" flex items-center flex-wrap justify-between mx-[100px] my-9 gap-y-5">
            <div className=" w-full sm:w-1/2">
                <div className=" flex items-center justify-center sm:justify-start gap-2">
                    <Image
                        alt="logo"
                        src="/icon/logo.svg"
                        width={23}
                        height={26}
                    />
                    <Link href="/" className=" text-violet text-2xl font-semibold">
                        Pakarya
                    </Link>
                </div>
            </div>

            <div className=" flex items-center justify-evenly w-full sm:justify-end sm:w-1/2 gap-0.5">
                <Link href="/login">
                    <Button className=" font-medium text-base hover:text-white hover:bg-black-100 py-3 px-6 bg-white text-black-100">
                        Login
                    </Button>
                </Link>
                <Link href="/register">
                    <Button className=" font-medium text-base hover:text-white hover:bg-black-100 py-3 px-6 bg-white text-black-100">
                        Sign up
                    </Button>
                </Link>
            </div>
        </header>
    )
}