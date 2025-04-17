import { auth } from "@/server/auth";
import { prisma } from "@/server/db"; // your Prisma client
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import question from "@/app/question.json";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
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

  const currentLevel = user.School?.level ?? 1;
  const currentQuestion = question.levels[currentLevel - 1];
  const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();
  // console.log("Expected:", currentQuestion.answer.toLowerCase().trim());
  // console.log("Received:", answer.trim().toLowerCase());

  const isCorrect = normalize(currentQuestion.answer) === normalize(answer);

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
    console.log("existingCorrectAttempt:", !!existingCorrectAttempt);

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

      if (!user.schoolCode) {
        return NextResponse.json(
          { error: "No school code found for user" },
          { status: 400 }
        );
      }

      await prisma.school.update({
        where: {
          code: user.schoolCode,
        },
        data: {
          score: { increment: scoreToAward },
          level: currentLevel + 1,
        },
      });
      console.log("Successfully updated school level.");
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

    return NextResponse.json({ success: false, message: "Wrong Answer" });
  }
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
