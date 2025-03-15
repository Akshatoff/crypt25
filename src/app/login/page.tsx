"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

const handleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/welcome",
      disableRedirect: false,
    });
  } catch (error) {
    console.error("Login failed", error);
  }
};

export default function page() {
  return (
    <>
      <div className="section" id="login">
        <h1 className="text" id="login">
          Discord Login
        </h1>
        <button className="btn" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </>
  );
}
