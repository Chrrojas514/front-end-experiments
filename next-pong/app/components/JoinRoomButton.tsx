'use client'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import React, { useRef, useState } from 'react'
import { GameState } from '../types'

function JoinRoomButton({roomId}: GameState) {
  const [playerName, setPlayerName] = useState<string>('')
  const [isFull, setIsFull] = useState<boolean>(false)
  const dialogRef = useRef(null)
  const joinRef = useRef(null)
  const router = useRouter()
  
  const gameStateQuery = useQuery<GameState>('gameState', () =>
    fetch(`http://localhost:5000/gameStates/${roomId}`).then(res => res.json())
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

  const updateWithPlayerName = async (roomId:string) => {
    const playerNameRequest = {
      roomId: roomId,
      playerName: playerName
    }

    await fetch('http://localhost:5000/joinRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerNameRequest)
    })

    roomIsFull()
  }

  const handleClick = async (roomId:string, playerName:string) => {
    if (!playerName) {
      return
    }

    await updateWithPlayerName(roomId)
    router.push(`/gameRooms/play/${roomId}/${playerName}`, )
    //setPlayerName("")
  }

  const roomIsFull = () => {
    if (gameStateQuery.data.playerA === ("") || gameStateQuery.data.playerB === ("")) {
      setIsFull(false)
    }
    setIsFull(true)
  }

  if (isFull) {
    return <td>
      <button
          ref={joinRef}
          className='btn btn-secondary'
          // @ts-expect-error
          onClick={() => dialogRef.current?.showModal()}
          disabled={true}>
            join room
        </button>
    </td>
  }


  return (
    <td>
      {/*  */}
      {/* <button
      className='btn btn-secondary'
      // @ts-expect-error
      onClick={() => dialogRef.current?.showModal()}
      disabled={isFull}>
        join room
      </button> */}
      {!isFull
        ? <button
            ref={joinRef}
            className='btn btn-secondary'
            // @ts-expect-error
            onClick={() => dialogRef.current?.showModal()}>
              join room
          </button> :
          <button
              ref={joinRef}
              className='btn btn-secondary'
              // @ts-expect-error
              onClick={() => dialogRef.current?.showModal()}
              disabled={true}>
                join room
          </button>
      }
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
              onClick={async () => {handleClick(roomId, playerName)}}>
                submit
            </button>
          </form>
        </div>
      </dialog>
    </td>
  )
}

export default JoinRoomButton