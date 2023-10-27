'use client'
import React, { useState } from 'react'
import GameStage from '@/app/components/GameStage';

type GameState = {
  roomName: string;
  roomId: string;
  playerA: string;
  playerB: string;
  ballPositionX: number;
  ballPositionY: number;
  playerAPaddlePosition: number;
  playerBPaddlePosition: number;
}

const DEFAULT_GAME_STATE: GameState = {
  roomName: "",
  roomId: "",
  playerA: "",
  playerB: "",

  ballPositionX: 0,
  ballPositionY: 0,

  playerAPaddlePosition: 0,
  playerBPaddlePosition: 0
}

interface pageProps {
  params: { roomId: string }
}

const getGameRoom = async (roomId: string) => {
  const response = await fetch(`http://localhost:5000/gameStates/${roomId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  return response.json()
}

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom({params}) {
  const [gameRoom, setGameRoom] = useState<GameState>(DEFAULT_GAME_STATE)
  return (
    <>
    <div>current room id: {params.roomId}</div>
      <GameStage />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/ 

export default GameRoom