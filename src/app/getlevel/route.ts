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
    include: { School: true },
  });

  if (!user || !user.School) {
    return new Response(JSON.stringify({ error: "User or school not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ level: user.School.level }), {
    status: 200,
  });
}
