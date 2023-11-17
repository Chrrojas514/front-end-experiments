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
    
    await fetch('http://localhost:5000/createRoom', {
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
  }

  const handleSubmit = async (roomName:string) => {
    if (!roomName) {
      return
    }

    await createRoom(roomName)
    setRoomName("")
  }
  
  return (
    <div className='join'>
      <form onSubmit={() => handleSubmit(roomName)}>
      <input
        required
        className='input input-bordered join-item'
        placeholder='Create a room'
        value={roomName}
        onInput={e => setRoomName(e.currentTarget.value)} />
      <button className='btn btn-primary'>create room</button>
      </form>
    </div>
  )
}

export default RoomCreationForm


// SAMPLE GAMESTATE JSON OBJECTS
// {
// 	"roomName": "generating",
// 	"playerA": "",
// 	"playerB": "",
// 	"playerAPaddlePosition": 0,
// 	"playerBPaddlePosition": 0,
// 	"playerAScore": 0,
// 	"playerBScore": 0,
// 	"ballPositionX": 20,
// 	"ballPositionY": 20,
// 	"ballVelocityX": 2,
// 	"ballVelocityY": 2,
// 	"gameStarted": false,
// 	"gameOver": false,
// 	"roomId": "5670b0ab39b64"
// }
