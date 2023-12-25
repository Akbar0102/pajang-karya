"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link.js";

export const Login = () => {
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault(); // Ga akan nge refresh
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      return;
    }

    toast.success(message);

    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return (
    <div className="w-[360px] space-y-8">
      <div>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-3">
        <div className="space-y-2">
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </div>
        <div>
          <p>
            Don't have an accout?{" "}
            <Link href="/register">
              <span className="link">Register</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
