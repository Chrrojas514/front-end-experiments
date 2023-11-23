'use client'
import React from 'react'
import { useQuery } from 'react-query'
import { GameState } from '../types'

interface Props {
  roomId: string
}

function StartGameButton(roomId:Props) {
  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`http://localhost:5000/gameStates/${roomId}`).then(res =>
    res.json())
    )

  if (gameStateQuery.isError) {
    return (
      <div>ERROR WITH GAME ROOM</div>
    )
  }

  if (gameStateQuery.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  const startGame = async (roomId:Props) => {
    const response = await fetch(`http://localhost:5000/startGame`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomId)
    })
    const data = response.json()
  }

  const handleClick = async () => {
    await startGame(roomId)
  }

  return (
    <>
      <button
        className='btn btn-secondary'
        onClick={() => {handleClick()}}>
          Start Game
      </button>
    </>
  )
}

export default StartGameButton