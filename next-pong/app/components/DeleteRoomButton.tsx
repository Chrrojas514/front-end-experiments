import React from 'react'
import { useQuery } from 'react-query'
import { GameState } from '../types'
import { useRouter } from 'next/navigation'

function DeleteRoomButton({roomId}:string) {
  const router = useRouter()
  const gameStateQuery = useQuery<GameState>('gameState', () =>
    fetch(`http://localhost:5000/gameStates/${roomId}`).then(res => res.json())
    )
  
  const sendDeleteRequest = async () => {
    const response = await fetch(`http://localhost:5000/gameStates/${roomId}`, {
      method: 'DELETE'
    })
    console.log(response.json())
  }

  const handleClick = async () => {
    router.push('/gameRooms')
    await sendDeleteRequest()
  }

  return (
    <button
        className='btn btn-secondary px-4'
        onClick={() => handleClick()}>
            delete room
    </button>
  )
}

export default DeleteRoomButton