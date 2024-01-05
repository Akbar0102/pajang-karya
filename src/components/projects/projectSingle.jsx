import { Avatar, Image } from "@nextui-org/react"
import { Footer } from "../sharedUI/footer"
import { Header } from "../sharedUI/header"
import Link from "next/link"
import { AllComments } from "../comments/allComments"
import { CreateComment } from "../comments/createComment"
import { imageUrl } from "@/config/apiUrl"
import { cookies, headers } from "next/headers";
import {
    Github,
    LinkIcon
} from "lucide-react";

export const ProjectSingle = ({ data }) => {
    const token = cookies().get("token")?.value;
    let parsedPayload;

    if (token) {
        const headersList = headers();
        const payload = headersList.get("middlewareSet");
        parsedPayload = JSON.parse(payload);
    }

    const { id, name, user, featuredImage, description, repository, link, tech, comment } = data
    const { username, firstName, lastName } = user
    return (
        <>
            <Header />
            <main className=" mx-[100px] mt-[173px]">
                <section>
                    <h1 className=" text-[52px] text-black-50 font-semibold mb-3 break-all">{name}</h1>
                    <div className=" flex gap-1 items-center">
                        <Avatar size="sm" name={username} radius="full" color="primary"/>
                        <Link href={`/${username}`}>
                            <h4 className=" font-normal text-grey hover:text-violet break-all">{`${firstName} ${lastName}`}</h4>
                        </Link>
                    </div>
                    <Image
                        className=" mt-16 rounded-3xl"
                        alt="project-featured-image"
                        src={`${imageUrl}/projects/tr:w-856,h-572,c-at_max/${id}/${featuredImage}`}
                    />
                </section>

                <section className=" mt-32 min-h-96">
                    <div className=" sm:grid sm:grid-cols-3 flex flex-col gap-y-6">
                        <div className=" sm:col-span-2">
                            <h2 className=" text-black-50 font-semibold mb-2">Overview</h2>
                            <p className=" text-medium font-medium pr-4 text-justify">
                                {description}
                            </p>
                        </div>
                        <div className=" flex flex-col gap-y-6">
                            <div>
                                <h2 className=" text-black-50 font-semibold mb-2">Link</h2>
                                <div className=" flex gap-1 mb-2">
                                    <Github size={20}/>
                                    <a href={repository} className=" text-medium font-medium hover:text-violet break-all">
                                        {repository}
                                    </a>
                                </div>
                                <div className=" flex gap-1">
                                    <LinkIcon size={20}/>
                                    <a href={link} className=" text-medium font-medium hover:text-violet break-all">
                                        {link}
                                    </a>
                                </div>
                            </div>
                            <div className=" sm:mt-[109px]">
                                <h2 className=" text-black-50 font-semibold mb-2">Tech stack</h2>
                                <p className=" text-medium font-medium">{tech}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className=" mt-14">
                    <h2 className=" text-black-50 font-semibold mb-[30px]">Comment</h2>
                    <AllComments commentsData={comment} currentUser={parsedPayload ? parsedPayload.id : null} />
                </section>

                {token ? (<CreateComment projectId={id} />) :
                    (<p className=" text-medium font-medium pr-4 mb-10">
                        Please login to give comment
                    </p>)}

            </main>
            <Footer />
        </>
    )
}