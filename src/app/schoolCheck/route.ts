import { NextResponse } from "next/server";
import { prisma } from "@/server/db"; // your Prisma client
import schoolData from "@/app/schoolData.json";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { schoolCode } = await req.json();

    if (!schoolCode) {
      return NextResponse.json(
        { error: "Missing School Code" },
        { status: 400 }
      );
    }
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    if (!data || !data.user || !data.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!data?.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isValidSchool = schoolData.schools.find(
      (school) => school.schoolCode === schoolCode
    );

    if (!isValidSchool) {
      return NextResponse.json(
        { error: "Invalid School Code" },
        { status: 400 }
      );
    }

    console.log("Updating user in database...");

    const existingSchool = await prisma.school.findUnique({
      where: { code: schoolCode },
    });

    if (!existingSchool) {
      return NextResponse.json(
        { error: "Invalid school code: No such school exists" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.user.email },
      select: { id: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Now we update, knowing that the school exists
    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: { schoolCode },
    });

    return NextResponse.json({
      message: "School Code verified",
      user,
      schoolName: isValidSchool.schoolName,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error); // Logs full error stack
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}
