import React from 'react'
import { useQuery } from 'react-query'
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


function GameRoomsTable() {

  const gameStatesQuery = useQuery('gameStates', () =>
    fetch('http://localhost:5000/gameStates').then(res =>
      res.json()
    )
  )

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
        {gameStatesQuery.data?.map((gameState: GameState) => 
        <tr key={gameState.roomId}> 
          <td>{gameState.roomName}</td>
          <td>{gameState.playerA}</td>
          <td>{gameState.playerB}</td>
          <td><JoinRoomButton /></td>
        </tr>)
        }
      </tbody>
    </table>
  </>
}

export default GameRoomsTable