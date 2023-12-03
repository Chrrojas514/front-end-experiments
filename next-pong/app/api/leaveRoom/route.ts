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

  // If player that requested to leave is A, reset player name to empty string
  if (data.playerName === target.playerA) {
    const updatedTarget = await prisma.gameState.update({
      where: {
        roomId: data.roomId,
      },
      data: {
        playerA: "",
      }
    })

    return NextResponse.json(updatedTarget, {status: 201})
  }

  if (data.playerName === target.playerB) {
    const updatedTarget = await prisma.gameState.update({
      where: {
        roomId: data.roomId,
      },
      data: {
        playerB: "",
      }
    })

    return NextResponse.json(updatedTarget, {status: 201})
  }

  return NextResponse.json('Room is full', {status: 400})
}