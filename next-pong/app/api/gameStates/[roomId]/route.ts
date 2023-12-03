import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"

export async function GET(request: Request, { params }: { params: { roomId: string } }) {
  const room = params.roomId

  const gameStates = await prisma.gameState.findUnique({
    where:{
      roomId: room,
    },
  })

  return NextResponse.json(gameStates, { status: 200 } )
}