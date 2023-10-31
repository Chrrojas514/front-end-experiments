import React from 'react'
import JoinRoomButton from './JoinRoomButton'
import { GameState } from '../types';

function GameRoomsTable({ gameRooms }:GameState[]) {

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