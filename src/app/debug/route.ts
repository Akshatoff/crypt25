import { NextResponse } from "next/server";
import { prisma } from "@/server/db"; // your Prisma client

export async function GET() {
  const school = await prisma.school.findUnique({
    where: { code: "123456" },
    include: { users: true },
  });

  return NextResponse.json({ users: school?.users || [] });
}
