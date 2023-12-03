import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

//STILL NEED TO END INTERVAL HERE SOMEHOW?

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
      gameStarted: false,
      gameOver: true,
      ballPositionX: 50,
      ballPositionY: 50,
      ballVelocityX: 0,
      ballVelocityY: 0
    }
  })

  return NextResponse.json(updatedTarget, {status: 201})
}