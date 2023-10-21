'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

const DEFAULT_GAME_STATE: GameState = {
  roomName: "",
  roomId: "",
  playerA: "",
  playerB: "",

  ballPositionX: 0,
  ballPositionY: 0,

  playerAPaddlePosition: 0,
  playerBPaddlePosition: 0
}

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
            <input
              className='input input-bordered'
              type='text'
              placeholder='Player name'
               />
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

export default JoinRoomButton