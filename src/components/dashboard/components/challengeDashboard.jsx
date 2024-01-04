import React from "react";
import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Button,
  CardHeader,
} from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link.js";

export const Challenge = ({ challengesData }) => {
  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Challenge</h1>
        <p>you got it.</p>
      </section>
      <section className="grid grid-cols-2 gap-6">
        {challengesData && challengesData.length === 0 && (
          <Card shadow="sm">
            <CardBody className="p-8 space-y-4">
              <h6>There's no available challenge yet.</h6>
            </CardBody>
          </Card>
        )}
        {challengesData &&
          challengesData.length > 0 &&
          challengesData.map(({ id, name, description, featuredImage }) => {
            return (
              <div key={id}>
                <Card
                  isFooterBlurred
                  className="w-full h-[450px] col-span-12 sm:col-span-5 flex flex-col justify-between"
                >
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-slate-600 uppercase font-bold">
                      New
                    </p>
                    <h4 className="text-black font-medium text-2xl">{name}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible p-2 flex items-center justify-center bg-primary-400/15 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-[356px] h-[238px] scale-125 object-cover"
                        src={`${imageUrl}/challenges/${id}/${featuredImage}`}
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <p className="text-black text-tiny">Available</p>
                      <p className="text-black text-tiny">Get exiced.</p>
                    </div>
                    <Link href={`/dashboard/challenge/detail/${id}`}>
                      <Button
                        className="text-tiny"
                        color="primary"
                        radius="full"
                        size="sm"
                      >
                        See
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
      </section>
    </main>
  );
};
