'use client'

import { CSSProperties, useCallback, useEffect, useState } from 'react';

type updatePaddleRequest = {
  roomId: string,
  playerName: string,
  paddlePosition: number
}

const DEFAULT_UPDATE_REQUEST: updatePaddleRequest = {
  roomId: "",
  playerName: "",
  paddlePosition: 12
}

const BASE_PADDLE_STYLES: CSSProperties = {width: '12px', height: '120px', backgroundColor: 'white'}

const MIN_PADDLE_POSITION = -3;
const MAX_PADDLE_POSITION = 33;

export default function GameStage({roomId, playerName}) {
    // pass down roomId, playerName as prop, setGameState to fetched gamestate, call paddlePosUpdate on handleKeyDown
  const [paddle, setPaddle] = useState<updatePaddleRequest>(DEFAULT_UPDATE_REQUEST)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const newPositon = Math.min(paddle.paddlePosition + 1, MAX_PADDLE_POSITION)
      
      paddle.roomId = roomId
      paddle.playerName = playerName
      paddle.paddlePosition = newPositon
      setPaddle(paddle)
      console.log('DOWN!')
    }
    
    if (e.key === 'ArrowUp') {
      const newPositon = Math.max(paddle.paddlePosition - 1 , MIN_PADDLE_POSITION)

      paddle.roomId = roomId
      paddle.playerName = playerName
      paddle.paddlePosition = newPositon
      setPaddle(paddle)
      console.log('UP')
    }
  }, [paddle])

  const sendUpdateRequest = async (paddleReq:updatePaddleRequest) => {
    const response = await fetch('http://localhost:5000/paddlePositionUpdate', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paddleReq)
    })

    const data:updatePaddleRequest = await response.json()
    console.log(data)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    sendUpdateRequest(paddle)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown])

  return (
    <div
      id='stage'
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid white',
        padding: '40px',
        width: '600px',
        height: '500px'
      }}>
      <div id='user_paddle' style={{...BASE_PADDLE_STYLES, marginTop: paddle.paddlePosition * 10}}></div>
      <div id='stage_divider' style={{ border: '2px dashed white'}}></div>
      <div id='ball' style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        backgroundColor: 'white',
        top: 225,
        left: 291,
      }}></div>
      <div id='other_player_paddle' style={{...BASE_PADDLE_STYLES}}></div>
    </div>
  )
}
