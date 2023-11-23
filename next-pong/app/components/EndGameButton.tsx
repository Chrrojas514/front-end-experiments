import React from 'react'
import { useQuery } from 'react-query'
import { GameState } from '../types'

interface Props {
  roomId: string | string[]
}

function EndGameButton({roomId}:Props) {
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

  return (
    <button 
      className='btn btn-secondary'
      onClick={() => sendEndRequest()}>
        End Game
    </button>
  )
}

export default EndGameButton