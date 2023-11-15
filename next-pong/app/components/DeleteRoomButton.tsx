import React from 'react'
import { useQuery } from 'react-query'
import { GameState } from '../types'
import { useRouter } from 'next/navigation'

function DeleteRoomButton({roomId}:GameState) {
  const router = useRouter()
  const gameStateQuery = useQuery<GameState>('gameState', () =>
    fetch(`http://localhost:5000/gameStates/${roomId}`).then(res => res.json())
    )
  
  const sendDeleteRequest = async () => {
    await fetch(`http://localhost:5000/gameStates/${roomId}`, {
      method: 'DELETE'
    })
  }

  const handleClick = async () => {
    await sendDeleteRequest()
    router.push('/gameRooms')
  }

  return (
    <button
        className='btn btn-secondary'
        onClick={() => handleClick()}>
            delete room
    </button>
  )
}

export default DeleteRoomButton