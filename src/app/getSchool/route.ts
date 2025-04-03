import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    if (!data || !data.user) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }
    const user = await db.user.findUnique({
      where: { email: data?.user.email },
      select: { schoolCode: true },
    });

    return NextResponse.json({ schoolCode: user.schoolCode || null });
  } catch (error) {
    console.error("Error fetching school Code", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
