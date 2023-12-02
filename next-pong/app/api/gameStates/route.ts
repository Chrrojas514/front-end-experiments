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
      ...body
    }
  })

  return NextResponse.json(newGameState, { status: 201 } )
}

export async function GET() {
  const gameStates = await prisma.gameState.findMany()

  return NextResponse.json(gameStates, { status: 201 } )
}