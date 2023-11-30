import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  roomId: string
}

function DeleteRoomButton({roomId}:Props) {
  const router = useRouter()
  
  const sendDeleteRequest = async () => {
    const response = await fetch(`http://localhost:5000/gameStates/${roomId}`, {
      method: 'DELETE'
    })
    console.log(response.json())
  }

  const handleClick = async () => {
    await sendDeleteRequest()
    router.push('/gameRooms')
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