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

//use state for input, kind of like usequery where it has to be in root of app so
//other files get the state update 

function JoinRoomButton({roomId}) {
  const [playerName, setPlayerName] = useState<string>('')
  const router = useRouter()

  const updateWithPlayerName = async (roomId:string) => {
    const playerNameRequest = {
      roomId: roomId,
      playerName: playerName
    }

    const response = await fetch('http://localhost:5000/joinRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerNameRequest)
    })

    console.log(roomId)
  }

  const handleClick = async (room:GameState) => {
    await updateWithPlayerName(roomId)
    setPlayerName("")
    // router.push('/gameRooms/play')
  }

  return (
    <td>
      <button 
      className='btn btn-secondary'
      // @ts-expect-error
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
              value={playerName}
              onInput={e => setPlayerName(e.currentTarget.value)}
               />
            <button
              className="btn btn-secondary join-item"
              onClick={async () => {handleClick(roomId)}}>
                submit
            </button>
          </form>
        </div>
      </dialog>
    </td>
  )
}

export default JoinRoomButton