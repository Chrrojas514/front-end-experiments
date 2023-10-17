'use client'
import { useState } from 'react'
import React from 'react'

interface GameState {
  roomName: string;
  roomId: string;
  playerA: string;
  playerB: string;
}

function RoomCreationForm() {
  const [newRoomName, setNewRoomName] = useState(null)

  // const createRoom = (gameState: GameState) => {
  //   const apiResponse = fetch('http://localhost:5000/createRoom', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(gameState)
  //   })
  // }
  
  return (
    <div className='join'>
      <input className='input input-bordered join-item' placeholder='Create a room' />
      <button className='btn btn-primary' onClick={() => {console.log('clicked!')}}>create room</button>
    </div>
  )
}

// function RoomCreationForm() {
//   return (
//     <form className='form from-primary join'>
//       <label className='label la'>
//         Create a room: <input className='border-solid border-black' type='text' name='name' />
//       </label>
//       <CreateRoomButton />
//     </form>
//   )
// }

export default RoomCreationForm