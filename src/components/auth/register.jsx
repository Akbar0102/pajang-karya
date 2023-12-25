"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast"
import Link from "next/link.js";

export const Register = () => {
  async function handleRegister(event) {
    event.preventDefault(); // Ga akan nge refresh
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;
    const about = event.target.about.value;

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, email, password, role, about }),
    });
    const data = await res.json();
    toast.success(data.message);
  }

  return (
    <div className="w-[460px] space-y-8">
      <div>
        <h3>Register</h3>
        <p>Please create an account</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-3">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input name="firstName" placeholder="First Name" />
            <Input name="lastName" placeholder="Last Name" />
          </div>
          <Input name="username" placeholder="Username" />
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Select name="role" label="Select your current experience" >
            <SelectItem key="beginner">Beginner</SelectItem>
            <SelectItem key="expert">Expert</SelectItem>
          </Select>
          <Textarea name="about" label="A little about yourself" />
          <Button color="primary" type="submit" className="w-full">
            Register
          </Button>
        </div>
        <div>
          <p>
            Already have an accout?{" "}
            <Link href="/login">
              <span className="link">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
