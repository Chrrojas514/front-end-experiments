import React from 'react'
import JoinRoomButton from './JoinRoomButton'


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

function GameRoomsTable({ gameRooms }) {

  return <>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Room name</th>
          <th>Player A</th>
          <th>Player B</th>
        </tr>
      </thead>
      <tbody>
        {gameRooms?.map((gameState: GameState) => 
        <tr key={gameState.roomId}> 
          <td>{gameState.roomName}</td>
          <td>{gameState.playerA}</td>
          <td>{gameState.playerB}</td>
          <JoinRoomButton roomId={gameState.roomId} />
        </tr>)
        }
      </tbody>
    </table>
  </>
}

export default GameRoomsTable