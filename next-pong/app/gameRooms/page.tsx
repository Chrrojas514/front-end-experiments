import React from 'react'
import JoinRoomButton from '../components/JoinRoomButton';
import RoomCreationForm from '../components/RoomCreationForm';

interface GameState {
  roomName: string;
  roomId: string;
  playerA: string;
  playerB: string;
}

const GameRoomPage = async () => {
  const response = await fetch('http://localhost:5000/gameStates', {cache: 'no-store'})
  const gameStates: GameState[] = await response.json()

  return <div>
    <>
      <h1 className='py-4'> Game rooms </h1>
      <h3 className='py-4 pb-4'> <RoomCreationForm /> </h3>
      <h1 className='py-4'> Or join an existing room: </h1>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Room name</th>
            <th>Player A</th>
            <th>Player B</th>
          </tr>
        </thead>
        <tbody>
          {gameStates.map(gameState => 
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
  </div>
}

export default GameRoomPage