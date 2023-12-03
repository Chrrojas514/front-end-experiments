import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

//STILL NEED TO START INTERVAL HERE SOMEHOW?

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

  const updatedTarget = await prisma.gameState.update({
    where: {
      roomId: data.roomId,
    },
    data: {
      gameStarted: true,
      gameOver: false,
      ballVelocityX: Math.floor(Math.random() * 2) ? 2 : -2,
      ballVelocityY: 0
    }
  })

  return NextResponse.json(updatedTarget, {status: 201})
}