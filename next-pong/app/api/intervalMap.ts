import { NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { GameState } from "../types"

const updateTick = async (roomId: string) => {
  const target = await prisma.gameState.findUnique({
    where: {
      roomId: roomId
    }
  })

  if (!target) {
    return NextResponse.json('Room not found', {status: 404})
  }

  // Sending the percent of where the pixel is, so 50 50 is center,
  // 0 50 is left center and 100 100 is bottom right
  const paddleABound = {
    top: target.playerAPaddlePosition,
    bottom: target.playerAPaddlePosition + 24,
  }
  const paddleBBound = {
    top: target.playerBPaddlePosition,
    bottom: target.playerBPaddlePosition + 24,
  }

  const ballHitPaddle = (gamestate: GameState) => {
    const isWithinPaddleX = () => {
      if (gamestate.ballPositionX === 10 || gamestate.ballPositionX === 90) {
        return true
      }

      return false
    }

    const isWithinPaddleY = () => {
      if ((gamestate.ballPositionY >= paddleABound.top
        && gamestate.ballPositionY <= paddleABound.bottom)
      || (gamestate.ballPositionY >= paddleBBound.top
        && gamestate.ballPositionY <= paddleBBound.bottom)) {
        return true
      }

      return false
    }

    if (isWithinPaddleX() && isWithinPaddleY()) {
      return true
    }

    return false
  }

  // const logBallPos = {
  //   ballPositionX: target.ballPositionX,
  //   ballPositionY: target.ballPositionY,
  // }

  // const logBallVel = {
  //   ballVelocityX: target.ballVelocityX,
  //   ballVelocityY: target.ballVelocityY,
  // }

  // console.log(paddleABound)
  // console.log(logBallPos)
  // console.log(logBallVel)
  // console.log(ballHitPaddle(target))


  // If ball hits roof or floor of arena
  if (target.ballPositionY <= 0 || target.ballPositionY >= 100) {
    target.ballVelocityY *= -1
  }

  if (ballHitPaddle(target)) {
    target.ballVelocityX *= -1
    target.ballVelocityY = Math.floor(Math.random() * 2) ? 2 : -2
  }

  if (playerAWon(target)) {
    target.playerAScore += 1

    target.ballPositionX = 50
    target.ballPositionY = 50

    target.ballVelocityX = Math.floor(Math.random() * 2) ? 2 : -2
    target.ballVelocityY = 0
  }

  if (playerBWon(target)) {
    target.playerBScore += 1

    target.ballPositionX = 50
    target.ballPositionY = 50

    target.ballVelocityX = Math.floor(Math.random() * 2) ? 2 : -2
    target.ballVelocityY = 0
  }

  target.ballPositionX += target.ballVelocityX
  target.ballPositionY += target.ballVelocityY

  await prisma.gameState.update({
    where: {
      roomId: roomId,
    },
    data: {
      ...target,
    }
  })
}

// Ball went out of bounds on the left
const playerAWon = (gamestate: GameState) => gamestate.ballPositionX >= 100

// Ball went out of bounds on the right
const playerBWon = (gamestate: GameState) => gamestate.ballPositionX <= 0

var intervalKeys : {
  roomId: string,
  intervalId: number
}

export { intervalKeys }