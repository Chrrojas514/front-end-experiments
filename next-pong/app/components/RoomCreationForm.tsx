'use client'
import { createContext, useState } from 'react';
import React from 'react'

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

const RoomCreationContext = createContext('default value')

function RoomCreationForm() {
  const [roomName, setRoomName] = useState<string>("")

  const handleClick = async (roomName:string) => {
    let newGameRoom: GameState = DEFAULT_GAME_STATE
    newGameRoom.roomName = roomName
    console.log(JSON.stringify(newGameRoom))
    
    const response = await fetch('http://localhost:5000/createRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGameRoom)
    })

    const data: GameState = await response.json()
    console.log(data)
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
