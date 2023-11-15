'use client'
import React, { useRef, useState } from 'react'
import GameStage from '@/app/components/GameStage';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { GameState } from '@/app/types';
import StartGameScreen from '@/app/components/StartGameScreen';

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom() {
  const params = useParams()
  const [refetchInterval, setRefetchInterval] = useState(200)

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`http://localhost:5000/gameStates/${params.roomId}`).then(res =>
    res.json()), {refetchInterval, onError:() => setRefetchInterval(0)}
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
      <StartGameScreen roomId={gameStateQuery.data.roomId}/>
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