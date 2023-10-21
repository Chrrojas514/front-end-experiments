'use client'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import JoinRoomButton from '../components/JoinRoomButton';
import RoomCreationForm from '../components/RoomCreationForm';


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
  // const response = await fetch('http://localhost:5000/gameStates', {cache: 'no-store'})
  // const data: GameState[] = await response.json()
  const gameStatesQuery = useQuery('gameStates', () =>
    fetch('http://localhost:5000/gameStates').then(res =>
      res.json()
    )
  )

  return <div>
    {!gameStatesQuery.isLoading
      ? <h1>There&apos;s {gameStatesQuery.data?.length} games availble</h1>
      : <h1>Loading games...</h1>
    }

    <>
      <h1 className='py-4'> Game rooms </h1>
      <h3 className='py-4 pb-4'> <RoomCreationForm /> </h3>
      <h1 className='py-4'> Or join an existing room: </h1>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Room name</th>
            <th>Player A</th>
            <th>Player B</th>
          </tr>
        </thead>
        <tbody>
          {gameStatesQuery.data?.map((gameState: GameState) => 
          <tr key={gameState.roomId}> 
            <td>{gameState.roomName}</td>
            <td>{gameState.playerA}</td>
            <td>{gameState.playerB}</td>
            <td><JoinRoomButton /></td>
          </tr>)
          }
        </tbody>
      </table>
    </>
  </div>
}

export default GameRoomPage