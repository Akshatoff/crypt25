import { NextResponse } from "next/server";
import prisma from "@/server/db";
import schoolData from "@/app/schoolData.json"
import { authClient } from "@/lib/auth-client";
import { error } from "console";

export async function POST(req:Request) {
    try {
        const {schoolCode} = await req.json();
        const {data} = await authClient.getSession();


        console.log("Session Data:", data); // Debugging

        if (!data || !data.user || !data.user.email) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (!data?.user?.name) {
            return NextResponse.json({error: "Unauthorised"}, {status: 401});
        }

        const isVaildSchool = schoolData.schools.find(schoolData => schoolData.schoolCode === schoolCode)
        if (!isVaildSchool) {
            return NextResponse.json({error: "Invaild School Code"}, {status: 400});
            
        }

        const user =  await prisma.user.update({
            where: { email: data.user.email},
            data: {schoolCode},
        });
        
        return NextResponse.json({message: "School Code verified", user, schoolName: isVaildSchool.schoolName});
    } catch (error) {
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
