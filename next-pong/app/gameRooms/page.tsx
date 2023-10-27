'use client'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import RoomCreationForm from '../components/RoomCreationForm'
import GameRoomsTable from '../components/GameRoomsTable'

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

const GameRoomPage = () => {
  const gameStatesQuery = useQuery('gameStates', () =>
    fetch('http://localhost:5000/gameStates').then(res =>
      res.json()
    )
  )

  const data = gameStatesQuery.data

  return <div>
    <>
      <h1 className='py-4'> Create a new, empty room or join one below</h1>
      <h3 className='py-4 pb-4'> <RoomCreationForm /> </h3>
      {!gameStatesQuery.isLoading
        ? <h1 className='py-4'>There&apos;s {gameStatesQuery.data?.length} games availble</h1>
        : <h1 className='py-4'>Loading games...</h1>
      }
      <GameRoomsTable gameRooms={data}/>
    </>
  </div>
}

export default GameRoomPage