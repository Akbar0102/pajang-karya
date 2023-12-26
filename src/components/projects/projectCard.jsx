"use client"
import { Card, CardBody, Image, CardFooter, user, Avatar } from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";

export const ProjectCard = ({ id, name, featuredImage, slug, username }) => {

    return (
        <Card className=" w-[287px] h-[322px] rounded-3xl">
            <CardBody className="overflow-visible p-0">
                <Image
                    alt="Card background"
                    className=" m-0 w-[287px] h-[226px] rounded-3xl"
                    src={`${imageUrl}/projects/tr:w-300,h-200,c-at_max/${id}/${featuredImage}`}
                    width={287}
                    height={226}
                />
            </CardBody>
            <CardFooter className="py-4 flex-col items-start">
                <p className=" text-lg font-semibold">{name}</p>
                <div className=" flex gap-1 items-center">
                    <Avatar name={username} radius="full" />
                    <p className=" font-normal text-grey text-base">{username}</p>
                </div>

            </CardFooter>
        </Card>
    )
}