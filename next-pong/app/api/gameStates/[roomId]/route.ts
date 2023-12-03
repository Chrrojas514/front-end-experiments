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

export async function PUT(request: any, { params }: { params: { roomId: string } }) {
  const room = params.roomId

  const target = await prisma.gameState.findUnique({
    where: {
      roomId: room,
    }
  })

  if (!target) {
    return NextResponse.json('Room not found', {status: 404})
  }

  const data = await request.json()

  if (data.playerName === target.playerA) {
    const result = await prisma.gameState.update({
      where: {
        roomId: room,
      },
      data: {
        playerAPaddlePosition: data.paddlePosition
      }
    })

    return NextResponse.json(result, {status: 200})
  }

  if (data.playerName === target.playerB) {
    const result = await prisma.gameState.update({
      where: {
        roomId: room,
      },
      data: {
        playerBPaddlePosition: data.paddlePosition
      }
    })

    return NextResponse.json(result, {status: 200})
  }

  return NextResponse.json('Player with given name not found', {status: 200});
}

export async function DELETE(request: Request, { params }: { params: { roomId: string } }) {
  const room = params.roomId

  const target = await prisma.gameState.findUnique({
    where: {
      roomId: room,
    }
  })

  if (!target) {
    return NextResponse.json('Room not found', {status: 404})
  }
}
