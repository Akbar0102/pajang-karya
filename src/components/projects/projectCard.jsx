"use client"
import { Card, CardBody, Image, CardFooter, user, Avatar } from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";

export const ProjectCard = ({ id, name, featuredImage, slug, username }) => {

    return (
        <Card className=" w-[287px] h-[322px] rounded-3xl">
            <CardBody className="overflow-visible p-0">
                <Link href={`/${username}/${slug}`}>
                    <Image
                        alt="Card background"
                        className=" m-0 w-[287px] h-[226px] rounded-3xl"
                        src={`${imageUrl}/projects/tr:w-300,h-200/${id}/${featuredImage}`}
                        width={287}
                        height={226}
                    />
                </Link>
            </CardBody>
            <CardFooter className="py-4 flex-col items-start">
                <Link href={`/${username}/${slug}`}>
                    <p className=" text-lg font-semibold hover:text-violet">{name}</p>
                </Link>
                <div className=" flex gap-1 items-center">
                    <Link href={`/${username}`}>
                        <Avatar name={username} radius="full" />
                    </Link>
                    <Link href={`/${username}`}>
                        <p className=" font-normal text-grey text-base hover:text-black-100">{username}</p>
                    </Link>
                </div>

            </CardFooter>
        </Card>
    )
}