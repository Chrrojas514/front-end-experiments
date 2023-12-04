'use client'
import React, { useState } from 'react'
import GameStage from '@/app/components/GameStage';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { GameState } from '@/app/types';
import StartGameScreen from '@/app/components/StartGameScreen';
import EndGameButton from '@/app/components/EndGameButton';
import DeleteRoomButton from '@/app/components/DeleteRoomButton';

/*-------------------------------------------------------------------------------------------*/
function GameRoom() {
  const params = useParams()
  const [refetchInterval, setRefetchInterval] = useState(200)

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`https://pong-lrohlxvjt-chris-projects-10429c46.vercel.app/api/gameStates/${params.roomId}`).then(res =>
    res.json()), {refetchInterval, onError:() => setRefetchInterval(0)}
    )
  
  if (gameStateQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (gameStateQuery.isError){
    return <div>ERROR</div>
  }

  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId

  // not a good if statement, should handle !gameStateQuery.data 
  if (!gameStateQuery.data || gameStateQuery.data.gameStarted === false) {
    
    return (
      <>
        {/* wrap in div, add as separate component and center it horizontally?  */}
        <table className='table table-bordered table-fixed border-spacing-4'>
          <thead>
            <tr>
              <th>Player A</th>
              <th>Player B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{gameStateQuery.data?.playerA}</th>
              <th>{gameStateQuery.data?.playerB}</th>
            </tr>
          </tbody>
        </table>

        <div className='flex items-center justify-center py-16'>
          <StartGameScreen roomId={roomId} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <DeleteRoomButton roomId={roomId} />
        </div>
      </> )
  }

  return (
    <>
      <div>current room id: {params.roomId} current player: {params.playerName}</div>
      <div className='flex space-x-36'>
        <div> Player {gameStateQuery.data.playerA} score: {gameStateQuery.data.playerAScore} </div>
        <div> Player {gameStateQuery.data.playerB} score: {gameStateQuery.data.playerBScore} </div>
      </div>
      <GameStage roomId={params.roomId} playerName={params.playerName} />
      <EndGameButton roomId={params.roomId} />
    </>
  )
}
/*-------------------------------------------------------------------------------------------*/

export default GameRoom