"use client";

import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { authClient } from "@/lib/auth-client";
import discordSVG from '../../../public/discord.svg';

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
      <div className="section centered cover" id="home">
        <span className="subtitle">
          Crypt@trix
        </span>
        <p>Interact with the button below to authorise your Discord account.</p>
        <button className="blurple" onClick={handleLogin}>
          <Image src={discordSVG} alt="Discord" />
          Login with Discord
        </button>
      </div>
    </>
  );
}
