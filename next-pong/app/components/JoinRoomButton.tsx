'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function JoinRoomButton() {
  const router = useRouter()

  return (
    <div>
      <button 
      className='btn btn-secondary'
      onClick={() => document.getElementById('joinModal').showModal()}>
        join room
      </button>
      <dialog id='joinModal' className='modal'>
        <div className='modal-box'>
          <h3 className="font-bold text-lg py-4">Enter your name</h3>
          <form method='dialog'>
            <input className='input input-bordered' placeholder='Player name' />
            <button
              className="btn btn-secondary join-item"
              onClick={() => router.push('/gameRooms/play')}>
                submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

// join room button instantly takes user to /play
// return (
//   <button
//     className='btn btn-secondary'
//     onClick={() => router.push('/gameRooms/play')}>
//       join room
//   </button>
// )

export default JoinRoomButton