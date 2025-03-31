"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data || !data.user) {
        router.push("/login");  
        }
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
          <p>Error Loading User Data</p>
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


// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider  = "postgresql"
//   url       = env("DATABASE_URL")
//   directUrl = env("DIRECT_URL")
// }

// model User {
//   id            String    @id
//   email         String    @unique
//   name          String
//   createdAt     DateTime  @default(now())
//   emailVerified Boolean
//   image         String?
//   updatedAt     DateTime
//   sessions      Session[]
//   accounts      Account[]
//   School        School?   @relation(fields: [schoolCode], references: [code])
//   schoolCode    String?
//   attempts      Attempt[]
//   level         Int       @default(1)
//   score         Int       @default(0)
//   banned        Boolean   @default(false)
//   finished      Boolean   @default(false)

//   @@index([schoolCode])
//   @@map("user")
// }

// model Session {
//   id           String   @id @default(cuid())
//   sessionToken String   @unique
//   expiresAt    DateTime
//   token        String
//   createdAt    DateTime
//   updatedAt    DateTime
//   ipAddress    String?
//   userAgent    String?
//   userId       String
//   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@unique([token])
//   @@index([userId])
//   @@map("session")
// }

// model Account {
//   id                    String    @id
//   accountId             String
//   providerId            String
//   userId                String
//   user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
//   accessToken           String?
//   refreshToken          String?
//   idToken               String?
//   accessTokenExpiresAt  DateTime?
//   refreshTokenExpiresAt DateTime?
//   scope                 String?
//   password              String?
//   createdAt             DateTime
//   updatedAt             DateTime

//   @@map("account")
// }

// model Verification {
//   id         String    @id
//   identifier String
//   value      String
//   expiresAt  DateTime
//   createdAt  DateTime?
//   updatedAt  DateTime?

//   @@map("verification")
// }

// model School {
//   name      String
//   users     User[]
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   code      String    @id @unique
//   Attempt   Attempt[]
// }

// model Attempt {
//   id          String   @id @default(cuid())
//   school_id   String
//   user_id     String
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   userAttempt String
//   School      School?  @relation(fields: [schoolCode], references: [code])
//   schoolCode  String?
//   User        User?    @relation(fields: [userId], references: [id])
//   userId      String?

//   @@index([user_id])
//   @@index([school_id])
// }

// model CorrectAttempt {
//   id      String @id @default(cuid())
//   level   Int
//   attempt String
// }

