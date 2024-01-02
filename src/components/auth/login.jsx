"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link.js";
import { useState } from 'react';

export const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault(); // Ga akan nge refresh
    const email = event.target.email.value;
    const password = event.target.password.value;

    setLoading(true);

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

    setLoading(false);
    router.push("/dashboard")
  }

  return (
    <div className="w-[460px] space-y-8">
      <div className="space-y-2">
        <h3>Login</h3>
        <p className="w-[425px] text-justify">
          <span className="font-bold tracking-tight mr-1">Pakarya</span>
          help you to exhibit your learning projects, share your coding triumphs
          and engage with other newly developer.
        </p>
      </div>
      <form onSubmit={handleLogin} className="space-y-3">
        <div className="space-y-2">
          <Input name="email" label="Email" type="email" isRequired/>
          <Input name="password" label="Password" type="password" isRequired/>
          <Button type="submit" color="primary" className="w-full" isLoading={loading}>
            Login
          </Button>
        </div>
        <div className="flex space-x-1">
          <p>Don&apos;t have an account?</p>
          <Link href="/register" className="link">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
