import React from 'react'
import CreateRoomButton from '../components/CreateRoomButton'

interface GameState {
  roomName: string;
  roomId: string;
}

const GameRoomPage = async () => {
  const response = await fetch('http://localhost:5000/gameStates', {cache: 'no-store'})
  const gameStates: GameState[] = await response.json()

  return (
    <>
      <h1>Game rooms</h1> <CreateRoomButton />
      <ul>
        {gameStates.map(gameState => <li key={gameState.roomId}> {gameState.roomName} </li>)}
      </ul>
    </>
  )
}

export default GameRoomPage