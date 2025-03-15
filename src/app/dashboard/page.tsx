"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type UserSession = {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
};
export default function page() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSession(data as UserSession);
      } catch (error) {
        setError(error as any);
        console.error("Error fetching data", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <div className="section" id="dash">
        {error ? (
          <p> Error Loading User Data</p>
        ) : session ? (
          <h1 className="text" id="name">
            Welcome, {session.user?.name || "User"}
          </h1>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}
