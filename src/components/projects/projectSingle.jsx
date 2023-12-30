import { Avatar, Image, user } from "@nextui-org/react"
import { Footer } from "../sharedUI/footer"
import { Header } from "../sharedUI/header"
import Link from "next/link"
import { AllComments } from "../comments/allComments"
import { CreateComment } from "../comments/createComment"
import { imageUrl } from "@/config/apiUrl"

export const ProjectSingle = ({ data }) => {
    const { id, name, user, featuredImage, description, repository, link, tech, comment } = data
    const { username } = user
    return (
        <>
            <Header />
            <main className=" mx-[100px] mt-[173px]">
                <section>
                    <h1 className=" text-[52px] text-black-50 font-[800]">{name}</h1>
                    <div className=" flex gap-1 items-center">
                        <Avatar name={username} radius="full" />
                        <p className=" font-normal text-grey text-[32px]">{username}</p>
                    </div>
                    <Image
                        className=" mt-16 rounded-3xl"
                        alt="project-featured-image"
                        src={`${imageUrl}/projects/tr:w-300,h-200,c-at_max/${id}/${featuredImage}`}
                        width={287}
                        height={332}
                    />
                </section>

                <section className=" mt-32 min-h-96">
                    <div className=" grid grid-cols-3">
                        <div className=" col-span-2">
                            <h2 className=" text-black-50 font-semibold text-4xl mb-2">Overview</h2>
                            <p className=" text-xl font-medium pr-4">
                                {description}
                            </p>
                        </div>
                        <div>
                            <div>
                                <h2 className=" text-black-50 font-semibold text-4xl mb-2">Link</h2>
                                <div className=" flex gap-1 mb-2 ml-2">
                                    <Image
                                        src="/icon/link.svg"
                                    />
                                    <a href={repository} className=" text-xl font-medium hover:text-violet break-all">
                                        {repository}
                                    </a>
                                </div>
                                <div className=" flex gap-1 ml-2">
                                    <Image
                                        src="/icon/link.svg"
                                    />
                                    <a href={link} className=" text-xl font-medium hover:text-violet break-all">
                                        {link}
                                    </a>
                                </div>


                            </div>
                            <div className=" mt-[109px]">
                                <h2 className=" text-black-50 font-semibold text-4xl mb-2">Tech stack</h2>
                                <p className=" text-xl font-medium">{tech}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className=" mt-14">
                    <h2 className=" text-black-50 font-semibold text-4xl mb-[30px]">Comment</h2>
                    <AllComments commentsData={comment} />
                </section>

                <CreateComment projectId={id} />
            </main>
            <Footer />
        </>
    )
}