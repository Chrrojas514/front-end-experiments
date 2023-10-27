import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { GameState, DEFAULT_GAME_STATE } from '../types'

//use state for input, kind of like usequery where it has to be in root of app so
//other files get the state update 

function JoinRoomButton({roomId}: GameState) {
  const [playerName, setPlayerName] = useState<string>('')
  const dialogRef = useRef(null)
  const router = useRouter()
  const queryClient = useQueryClient();
      

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

    await queryClient.invalidateQueries({
      queryKey: 'gameStates',
    });

    console.log(roomId)
  }

  const handleClick = async (roomId:string) => {
    await updateWithPlayerName(roomId)
    setPlayerName("")
    router.push(`/gameRooms/play/${roomId}`)
    console.log(roomId)
  }

  return (
    <td>
      <button 
      className='btn btn-secondary'
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