import React from 'react'
import { useQuery } from 'react-query'
import { GameState } from '../types'

function EndGameButton({roomId}:string) {
  const gameStateQuery = useQuery<GameState>('gameState', () =>
    fetch(`http://localhost:5000/gameStates/${roomId}`).then(res => res.json())
    )

  const sendEndRequest = async () => {
    const request = { roomId }

    await fetch(`http://localhost:5000/endGame`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
  }

  const handleClick = async () => {
    await sendEndRequest()
  }

  return (
    <button 
      className='btn btn-secondary'
      onClick={() => handleClick()}>
        End Game
    </button>
  )
}

export default EndGameButton