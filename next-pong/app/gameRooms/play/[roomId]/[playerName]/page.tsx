'use client'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import GameStage from '@/app/components/GameStage';
import { GameState, DEFAULT_GAME_STATE } from '../../../../types';
import { useParams } from 'next/navigation';

// needed?
interface pageProps {
  params: { 
    roomId: string,
    playerName: string
  }
}

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)
  const queryClient = useQueryClient()

  const params = useParams()

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`http://localhost:5000/gameStates/${params.roomId}`).then(res =>
    res.json())
    )

  console.log(params)

  return (
    <>
      <div>current room id: {params.roomId} current player: {params.playerName}</div>
      <GameStage roomId={params.roomId} playerName={params.playerName} />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/ 

export default GameRoom