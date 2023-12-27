import { Avatar, Image } from "@nextui-org/react"
import { Footer } from "../sharedUI/footer"
import { Header } from "../sharedUI/header"
import Link from "next/link"
import { AllComments } from "../comments/allComments"
import { CreateComment } from "../comments/createComment"

export const ProjectSingle = () => {
    return (
        <>
            <Header />
            <main className=" mx-[100px] mt-[173px]">
                <section>
                    <h1 className=" text-[52px] text-black-50 font-[800]">Portfolio assignment</h1>
                    <div className=" flex gap-1 items-center">
                        <Avatar name={"Munir"} radius="full" />
                        <p className=" font-normal text-grey text-[32px]">Munir</p>
                    </div>
                    <Image
                        className=" bg-sky-700 mt-16 rounded-3xl"
                        alt="project-featured-image"
                        src="/icon/logo.svg"
                        width={287}
                        height={332}
                    />
                </section>

                <section className=" mt-32 min-h-96">
                    <div className=" grid grid-cols-3">
                        <div className=" col-span-2">
                            <h2 className=" text-black-50 font-semibold text-4xl mb-2">Overview</h2>
                            <p className=" text-xl font-medium">
                                Salah satu tugas saat mengikuti bootcamp belajar web programming. Awalnya agak sulit karena belum mengerti pemprograman tapi lama-lama seru juga :D
                            </p>
                        </div>
                        <div>
                            <div>
                                <h2 className=" text-black-50 font-semibold text-4xl mb-2">Link</h2>
                                <div className=" flex gap-1 mb-2 ml-2">
                                    <Image
                                        src="/icon/link.svg"
                                    />
                                    <a href="github.com/portfolio-assignment" className=" text-xl font-medium hover:text-violet">
                                        github.com/portfolio-assignment
                                    </a>
                                </div>
                                <div className=" flex gap-1 ml-2">
                                    <Image
                                        src="/icon/link.svg"
                                    />
                                    <a href="portfoliome.vercel.app" className=" text-xl font-medium hover:text-violet">
                                        portfoliome.vercel.app
                                    </a>
                                </div>


                            </div>
                            <div className=" mt-[109px]">
                                <h2 className=" text-black-50 font-semibold text-4xl mb-2">Tech stack</h2>
                                <p className=" text-xl font-medium">Next.js, Vercel</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className=" mt-14">
                    <h2 className=" text-black-50 font-semibold text-4xl mb-[30px]">Comment</h2>
                    <AllComments />
                </section>

                <CreateComment />
            </main>
            <Footer />
        </>
    )
}