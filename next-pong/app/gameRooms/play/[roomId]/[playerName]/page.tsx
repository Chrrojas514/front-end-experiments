'use client'
import React, { useRef, useState } from 'react'
import GameStage from '@/app/components/GameStage';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { GameState } from '@/app/types';
import StartGameButton from '@/app/components/StartGameButton';

// needed?
interface pageProps {
  params: { 
    roomId: string,
    playerName: string
  }
}

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom() {
  const params = useParams()
  const startGameRef = useRef(null)

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`http://localhost:5000/gameStates/${params.roomId}`).then(res =>
    res.json()), {refetchInterval:200}
    )
  
  if (gameStateQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (gameStateQuery.isError){
    return <div>ERROR</div>
  }

  if (!gameStateQuery.data) {
    return <div>MISSING DATA</div>
  }

  if (gameStateQuery.data.gameStarted === false) {
    return (
    <div>
      <StartGameButton roomId={gameStateQuery.data?.roomId}/>
    </div>
    )
  }

  return (
    <>
      <div>current room id: {params.roomId} current player: {params.playerName}</div>
      <GameStage roomId={params.roomId} playerName={params.playerName} />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/ 

export default GameRoom