"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Button,
  CardHeader,
} from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link.js";

export const ChallengeDetail = ({ challengeData }) => {
  const router = useRouter();
  const user = Cookies.get("user");
  const parsedUser = JSON.parse(user);
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const isUserJoined = challengeData.userChallenge.some(
    (user) => user.user.username === parsedUser.username
  );

  useEffect(() => {
    setJoined(isUserJoined);
  }, [isUserJoined]);

  async function handleJoin() {
    setLoading(true);
    const token = Cookies.get("token");

    const challengeId = challengeData.id;
    const requestData = {
      challengeId: challengeId,
    };

    const res = await fetch("/api/challenges/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(requestData),
    });

    setLoading(false);

    if (res.status === 201) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="space-y-12">
      <section className="flex justify-between">
        <div className="space-y-2">
          <h1>{challengeData.name}</h1>
          {/* <div className="flex gap-2 items-center">
            <div className="bg-zinc-100 text-black font-medium px-3 py-1 rounded-full">
              {data.user.username}
            </div>
            <div>{data.category}</div>
          </div> */}
        </div>
        <Button
          color="primary"
          onClick={handleJoin}
          isDisabled={joined}
          isLoading={loading}
        >
          {joined ? "Already Join" : "Join"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <Image
          // alt={data.name}
          src={`${imageUrl}/challenges/tr:h-500/${challengeData.id}/${challengeData.featuredImage}`}
          width={800}
          height={800}
          className="rounded-xl"
        />
      </section>

      <section className="space-y-2">
        <h3>Description</h3>
        <p className="whitespace-pre-wrap">{challengeData.description}</p>
      </section>

      {joined ? (
        <section className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h3>You've done? good work!</h3>
            <p className="whitespace-pre-wrap">Show your solution by upload project, and receive feedback from community.</p>
          </div>
          <Link href="/dashboard/project/add">
            <Button color="primary">Add Project</Button>
          </Link>
        </section>
      ) : (
        <p className=" text-xl font-medium pr-4 mb-5">
          Eager to test your skill? join to submit your solution
        </p>
      )}
    </main>
  );
};
