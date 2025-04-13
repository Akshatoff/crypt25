import { auth } from "@/server/auth";
import { prisma } from "@/server/db"; // your Prisma client
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

  const user = await prisma.user.findUnique({
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

  if (isCorrect) {
    const existingCorrectAttempt = await prisma.attempt.findFirst({
      where: {
        level: currentLevel,
        schoolCode: user.schoolCode ?? undefined,
        userAttempt: {
          equals: currentQuestion.answer,
          mode: "insensitive",
        },
      },
    });

    if (!existingCorrectAttempt) {
      const uniqueSchoolCount = await prisma.attempt.findMany({
        where: {
          level: currentLevel,
          userAttempt: {
            equals: currentQuestion.answer,
            mode: "insensitive",
          },
        },
        select: {
          schoolCode: true,
        },
        distinct: ["schoolCode"],
      });

      const position = uniqueSchoolCount.length;
      const scoreToAward = Math.max(100 - position * 10, 10);

      await prisma.school.update({
        where: {
          code: user.schoolCode ?? "",
        },
        data: {
          score: { increment: scoreToAward },
        },
      });

      await prisma.user.updateMany({
        where: {
          schoolCode: user.schoolCode ?? undefined,
          level: currentLevel,
        },
        data: {
          level: currentLevel + 1,
        },
      });
    }

    await prisma.attempt.create({
      data: {
        user_id: user.id,
        school_id: user.schoolCode ?? "",
        userAttempt: answer,
        level: currentLevel,
        schoolCode: user.schoolCode,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      nextLevel: currentLevel + 1,
    });
  } else {
    return NextResponse.json({ success: false, message: "Wrong Answer" });
  }

  // await prisma.attempt.create({
  //   data: {
  //     school_id: user.schoolCode || "",
  //     user_id: user.id,
  //     userAttempt: answer,
  //     level: currentLevel,
  //     schoolCode: user.schoolCode,
  //     userId: user.id,
  //   },
  // });
  // if (isCorrect) {
  //   await prisma.user.update({
  //     where: { email: session.user.email },
  //     data: { level: currentLevel + 1 },
  //   });

  //   return NextResponse.json({ success: true, nextLevel: currentLevel + 1 });
  // } else {
  //   return NextResponse.json({ success: false, message: "Wrong Answer" });
  // }
}
