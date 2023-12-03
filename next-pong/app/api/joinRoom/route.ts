import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

export async function POST(request: Request) {
  const data = await request.json()

  const target = await prisma.gameState.findUnique({
    where: {
      roomId: data.roomId
    }
  })

  if (!target) {
    return NextResponse.json('Room not found', {status: 404})
  }

  // If player A has no current name, assign it to A
  if (!target.playerA) {
    const updatedTarget = await prisma.gameState.update({
      where: {
        roomId: data.roomId,
      },
      data: {
        playerA: data.playerName
      }
    })

    return NextResponse.json(updatedTarget, {status: 201})
  }

  if (!target.playerB) {
    const updatedTarget = await prisma.gameState.update({
      where: {
        roomId: data.roomId,
      },
      data: {
        playerB: data.playerName
      }
    });

    return NextResponse.json(updatedTarget, {status: 201})
  }

  return NextResponse.json('Room is full', {status: 400})
}