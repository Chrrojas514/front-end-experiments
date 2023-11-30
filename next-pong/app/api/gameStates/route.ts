import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/prisma/client"

const createGameStateSchema = z.object({
  roomName: z.string().min(1).max(30),
  playerA: z.string().min(1),
  playerB: z.string().min(1),
  playerAPaddlePosition: z.number(),
  playerBPaddlePosition: z.number(),
  playerAScore: z.number(),
  playerBScore: z.number(),
  ballPositionX: z.number(),
  ballPositionY: z.number(),
  ballVelocityX: z.number(),
  ballVelocityY: z.number(),
  gameStarted: z.boolean(),
  gameOver: z.boolean(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const validation = createGameStateSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 } )
  }

  console.log(body)

  const newGameState = await prisma.gameState.create({
    data: {
      roomName: body.roomName,
      playerA: body.playerA,
      playerB: body.playerB,
      playerAPaddlePosition: body.playerAPaddlePosition,
      playerBPaddlePosition: body.playerBPaddlePosition,
      playerAScore: body.playerAScore,
      playerBScore: body.playerBScore,
      ballPositionX: body.ballPositionX,
      ballPositionY: body.ballPositionY,
      ballVelocityX: body.ballVelocityX,
      ballVelocityY: body.ballVelocityY,
      gameStarted: body.gameStarted,
      gameOver: body.gameOver
    }
  })

  // console.log(newGameState)

  return NextResponse.json(newGameState, { status: 201 } )
}