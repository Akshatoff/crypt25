import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      select: {
        name: true,
        score: true,
      },
      orderBy: {
        score: "desc",
      },
    });

    return NextResponse.json(
      schools.map((s, i) => ({
        rank: i + 1,
        team: s.name,
        score: s.score,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch leaderboard", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
