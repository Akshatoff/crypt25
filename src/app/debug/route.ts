import { NextResponse } from "next/server";
import db from "@/server/db";

export async function GET() {
  const school = await db.school.findUnique({
    where: { code: "123456" },
    include: { users: true },
  });

  return NextResponse.json({ users: school?.users || [] });
}
