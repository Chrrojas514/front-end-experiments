'use client'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { UpdatePaddleRequest, DEFAULT_UPDATE_REQUEST, GameState } from '../types'

const BASE_PADDLE_STYLES: CSSProperties = {width: '2%', height: '24%', backgroundColor: 'white', position: 'absolute'}

const MIN_PADDLE_POSITION = 0
const MAX_PADDLE_POSITION = 76

interface GameStateProps {
  roomId: string | string[],
  playerName: string | string[] ,
}

export default function GameStage({roomId, playerName}: GameStateProps) {
  // pass down roomId, playerName as prop, setGameState to fetched gamestate, call paddlePosUpdate on handleKeyDown
  const [paddle, setPaddle] = useState<UpdatePaddleRequest>(DEFAULT_UPDATE_REQUEST)
  const queryClient = useQueryClient()
  const newPaddle = paddle

  const gameStateQuery = useQuery<GameState>('gameState', () =>
  fetch(`/api/gameStates/${roomId}`).then(res =>
    res.json()), {refetchInterval:100}
    )

  const sendUpdateRequest = useCallback (async (paddleReq:UpdatePaddleRequest) => {
    await fetch(`/api/gameStates/${roomId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paddleReq)
    })

    await queryClient.invalidateQueries({
      queryKey: ['gameStates', roomId]
    })
  }, [queryClient, roomId])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const newPositon = Math.min(paddle.paddlePosition + 1, MAX_PADDLE_POSITION)
      
      newPaddle.roomId = roomId
      newPaddle.playerName = playerName
      newPaddle.paddlePosition = newPositon
      setPaddle(newPaddle)
    }
    
    if (e.key === 'ArrowUp') {
      const newPositon = Math.max(paddle.paddlePosition - 1 , MIN_PADDLE_POSITION)

      newPaddle.roomId = roomId
      newPaddle.playerName = playerName
      newPaddle.paddlePosition = newPositon
      setPaddle(newPaddle)
    }
    sendUpdateRequest(paddle)
  }, [newPaddle, paddle, playerName, roomId, sendUpdateRequest])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [paddle, handleKeyDown])

  if (gameStateQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (gameStateQuery.isError){
    return <div>ERROR</div>
  }

  if (!gameStateQuery.data) {
    return <div>MISSING DATA</div>
  }

  const isPlayerA = playerName === gameStateQuery.data.playerA;

  const playerKey = isPlayerA ? 'playerAPaddlePosition' : 'playerBPaddlePosition'
  const opponent = isPlayerA ? 'playerBPaddlePosition' : 'playerAPaddlePosition'

  return (
    <div
      id='stage'
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid white',
        width: '600px',
        height: '500px'
      }}>
      <div id='user_paddle' style={{...BASE_PADDLE_STYLES, top: gameStateQuery.data[playerKey] + "%", left: '40px'}}></div>
      <div id='stage_divider' style={{ border: '2px dashed white'}}></div>
      <div id='ball' style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        backgroundColor: 'white',
        top: gameStateQuery.data.ballPositionY + "%",
        left: gameStateQuery.data.ballPositionX + "%",
      }}></div>
      <div id='other_player_paddle' style={{...BASE_PADDLE_STYLES, top: gameStateQuery.data[opponent] + "%", right: '40px'}}></div>
    </div>
  )
}
