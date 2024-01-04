"use client";

import React, { useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const UserProfileEdit = ({ payload }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSaveProfile(event) {
    event.preventDefault();
    setLoading(true);

    const token = Cookies.get("token");

    const formData = new FormData();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const about = event.target.about.value;

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("about", about);

    const res = await fetch(`/api/users`, {
      method: "PUT",
      headers: {
        Cookie: `token=${token}`,
      },
      body: formData,
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      return;
    }

    setLoading(false);

    toast.success(message);

    if (res.status === 201) {
      router.refresh();
    }
  }

  return (
    <main className="space-y-8">
      <section>
        <div>
          <h3>Edit Profile</h3>
          <p>Here you can edit your profile.</p>
        </div>
      </section>
      <form onSubmit={handleSaveProfile}>
        <section className="space-y-4">
          <Input
            name="username"
            label="Username"
            isDisabled
            defaultValue={payload.username}
          />
          <Input
            name="firstName"
            label="First Name"
            defaultValue={payload.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            defaultValue={payload.lastName}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            defaultValue={payload.email}
          />
          <Textarea
            maxRows={5}
            disableAnimation
            disableAutosize
            name="about"
            label="About"
            defaultValue={payload.about}
            classNames={{
              input: "min-h-[100px]",
            }}
          />
          <Button type="submit" isLoading={loading} color="primary">
            Save
          </Button>
        </section>
      </form>
    </main>
  );
};
