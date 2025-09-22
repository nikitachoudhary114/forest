import { authOptions } from "@/lib/authOptions";
import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `Server error:- ${error}` },
      { status: 500 }
    );
  }
}


