import { useState } from 'react'
import { useQueryClient } from 'react-query';
import React from 'react'
import { GameState, DEFAULT_GAME_STATE } from '../types';

function RoomCreationForm() {
  const [roomName, setRoomName] = useState<string>("")
  const queryClient = useQueryClient()

  const createRoom = async (roomName:string) => {
    let newGameRoom: GameState = DEFAULT_GAME_STATE
    newGameRoom.roomName = roomName
    
    const response = await fetch('http://localhost:5000/createRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGameRoom)
    })

    await queryClient.invalidateQueries({
      queryKey: 'gameStates',
    })

    // const data: GameState = await response.json()
    // console.log(data)
  }

  const handleClick = async (roomName:string) => {
    await createRoom(roomName)
    setRoomName("")
  }
  
  return (
    <div className='join'>
      <input
        className='input input-bordered join-item'
        placeholder='Create a room'
        value={roomName}
        onInput={e => setRoomName(e.currentTarget.value)} />
      <button className='btn btn-primary' onClick={async () => { await handleClick(roomName)} }>create room</button>
    </div>
  )
}

export default RoomCreationForm


// SAMPLE GAMESTATE JSON OBJECTS
// {
//   "roomName": "tesdsadtingd",
//   "playerA": "",
//   "playerB": "mePlayerB",
//   "playerAPaddlePosX": 5,
//   "playerAPaddlePosY": 5,
//   "playerAPaddleSize": 5,
//   "playerBPaddlePosX": 115,
//   "playerBPaddlePosY": 5,
//   "playerBPaddleSize": 5,
//   "playerAScore": 0,
//   "playerBScore": 0,
//   "ballPositionX": 20,
//   "ballPositionY": 20,
//   "ballVelocityX": 2,
//   "ballVelocityY": 2,
//   "gameStarted": false,
//   "gameOver": false
// }
