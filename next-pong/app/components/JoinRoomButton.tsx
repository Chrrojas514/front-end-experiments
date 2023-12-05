'use client'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import React, { useRef, useState } from 'react'
import { GameState } from '../types'

interface Props {
  roomId: string
}

function JoinRoomButton({roomId}: Props) {
  const [playerName, setPlayerName] = useState<string>('')
  const dialogRef = useRef(null)
  const joinRef = useRef(null)
  const router = useRouter()
  
  const gameStateQuery = useQuery<GameState>(['gameState', roomId], () =>
    fetch(`/api/gameStates/${roomId}`).then(res => res.json())
    )

  if (gameStateQuery.isLoading) {
    return <td>Loading...</td>
  }

  if (gameStateQuery.isError){
    return <td>ERROR</td>
  }

  if (!gameStateQuery.data) {
    return <td>MISSING DATA</td>
  }

  const isFull = (!!gameStateQuery.data.playerA && !!gameStateQuery.data.playerB);

  const updateWithPlayerName = async (roomId:string) => {
    const playerNameRequest = {
      roomId: roomId,
      playerName: playerName
    }

    await fetch('/api/joinRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerNameRequest)
    })
  }

  const handleClick = async (roomId:string, playerName:string) => {
    if (!playerName) {
      return
    }

    await updateWithPlayerName(roomId)
    router.push(`/gameRooms/play/${roomId}/${playerName}`, )
  }

  return (
    <td>
      <button
        ref={joinRef}
        className='btn btn-secondary'
        disabled={isFull}
        // @ts-expect-error
        onClick={() => dialogRef.current?.showModal()}>
          join room
      </button>
      <dialog ref={dialogRef} id='joinModal' className='modal'>
        <div className='modal-box'>
          <h3 className="font-bold text-lg py-4">Enter your name</h3>
          <form method='dialog'>
            <input
              className='input input-bordered'
              type='text'
              placeholder='Player name'
              value={playerName}
              onInput={e => setPlayerName(e.currentTarget.value)}
               />
            <button
              className="btn btn-secondary join-item"
              onClick={() => {handleClick(roomId, playerName)}}>
                submit
            </button>
          </form>
        </div>
      </dialog>
    </td>
  )
}

export default JoinRoomButton