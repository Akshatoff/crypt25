import { auth } from "@/server/auth";
import db from "@/server/db"; // your Prisma client
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import question from "@/app/question.json";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not Authorised" }, { status: 401 });
  }

  const body = await req.json();
  const { answer } = body;

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { School: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const currentLevel = user.level;
  const currentQuestion = question.levels.find((q) => q.level === currentLevel);

  if (!currentQuestion) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const isCorrect =
    currentQuestion.answer.toLowerCase().trim() === answer.trim().toLowerCase();

  await db.attempt.create({
    data: {
      school_id: user.schoolCode || "",
      user_id: user.id,
      userAttempt: answer,
      level: currentLevel,
      schoolCode: user.schoolCode,
      userId: user.id,
    },
  });
  if (isCorrect) {
    await db.user.update({
      where: { email: session.user.email },
      data: { level: currentLevel + 1 },
    });

    return NextResponse.json({ success: true, nextLevel: currentLevel + 1 });
  } else {
    return NextResponse.json({ success: false, message: "Wrong Answer" });
  }
}
