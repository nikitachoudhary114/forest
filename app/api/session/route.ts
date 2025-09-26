import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
let totalTree = 0;
let totalCoin = 0;
let burnedTree = 0;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized error" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const time = body.duration; // minutes

    if (time < 60) {
      totalTree = 1;
      totalCoin = 100;
      burnedTree = 1;
    } else if (time >= 60 && time < 120) {
      totalTree = 2;
      totalCoin = 200;
      burnedTree = 1;
    } else {
      totalTree = 3;
      totalCoin = 300;
      burnedTree = 2;
    }

    const userFocusSession = await prisma.focusSession.create({
      data: {
        userId: (session.user as { id: string }).id,
        duration: time,
        status: "Running",
        startTime: new Date(),
        endTime: new Date(Date.now() + time * 60 * 1000), // auto-set endTime
        trees: totalTree,
        coins: totalCoin,
      },
    });

    return NextResponse.json(
      { message: "Focus session started", session: userFocusSession },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error:- ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized error" },
        { status: 401 }
      );
    }

    const userFocusSession = await prisma.focusSession.findFirst({
      where: {
        userId: (session.user as { id: string }).id,
        status: "Running",
      },
    });

    if (!userFocusSession) {
      return NextResponse.json(
        { message: "No running session found" },
        { status: 404 }
      );
    }

    const now = new Date();

    if (userFocusSession.endTime && now >= userFocusSession.endTime) {
      // Session completed successfully
      await prisma.focusSession.update({
        where: { id: userFocusSession.id },
        data: { status: "Completed" },
      });

      await prisma.user.update({
        where: { id: (session.user as { id: string }).id },
        data: {
          totalTrees: { increment: userFocusSession.trees },
          totalCoins: { increment: userFocusSession.coins },
        },
      });

      return NextResponse.json(
        { message: "Session completed and rewards added" },
        { status: 200 }
      );
    } else {
      // User ended session early → Burned
      await prisma.focusSession.update({
        where: { id: userFocusSession.id },
        data: { status: "Burned" },
      });

      await prisma.user.update({
        where: { id: (session.user as { id: string }).id },
        data: {
          totalTrees: { decrement: burnedTree }, // or burnedTree logic
        },
      });

      return NextResponse.json(
        { message: "Session burned, penalty applied" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Server error:- ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized error" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as { id: string }).id },
      include: { focusSessions: true },
    });

    return NextResponse.json(
      { message: "Focus session data", sessions: user?.focusSessions ?? [] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error:- ${error}` },
      { status: 500 }
    );
  }
}
