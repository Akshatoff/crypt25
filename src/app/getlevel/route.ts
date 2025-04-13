import { auth } from "@/server/auth";
import { prisma } from "@/server/db"; // your Prisma client
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { level: true },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ level: user.level }), { status: 200 });
}
