'use client'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import GameStage from '@/app/components/GameStage';
import { GameState, DEFAULT_GAME_STATE, UpdatePaddleRequest } from '../../../../types';

interface pageProps {
  params: { 
    roomId: string,
    playerName: string
  }
}

const getGameRoom = async (roomId: string) => {
  const response = await fetch(`http://localhost:5000/gameStates/${roomId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  return response.json()
}

const getPlayer = async (gameState: GameState) => {

}

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom({params}: pageProps) {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`http://localhost:5000/gameStates/${params.roomId}`).then(res =>
    res.json())
    )

  return (
    <>
    <div>current room id: {params.roomId}</div>
      <GameStage roomId={params.roomId} playerName={gameStateQuery.data?.playerA} />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/ 

export default GameRoom