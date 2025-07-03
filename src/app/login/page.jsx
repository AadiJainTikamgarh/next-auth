"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLoginup = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log("Login Successfully", res);
      toast.success("Login Successfully");
      router.push(`/profile/${res.data.user}`);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"
      />
      <button
        onClick={onLoginup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login here
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
