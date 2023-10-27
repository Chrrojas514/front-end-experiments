'use client'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import GameStage from '@/app/components/GameStage';
import { GameState, DEFAULT_GAME_STATE } from '../../../types';


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

const updateGameRoom = async (roomId: string) => {
  // USE MUTATION? LOOK INTO USE MUTATION FOR PUT METHODS
  // wait do i even need this tho?
  const response = await fetch(`http://localhost:5000/gameStates/${roomId}`)
}

/*-------------------------------------------------------------------------------------------*/ 
function GameRoom({params}) {
  const gameStateQuery = useQuery<GameState>('gameStateById', () =>
  fetch(`http://localhost:5000/gameStates/${params.roomId}`).then(res =>
    res.json())
    )

  return (
    <>
    <div>current room id: {params.roomId}</div>
      <GameStage roomId={params.roomId} playerName={gameStateQuery.data?.playerNameA} />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/ 

export default GameRoom