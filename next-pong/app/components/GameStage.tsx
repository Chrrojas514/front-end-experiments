'use client'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { UpdatePaddleRequest, DEFAULT_UPDATE_REQUEST } from '../types'

const BASE_PADDLE_STYLES: CSSProperties = {width: '12px', height: '120px', backgroundColor: 'white'}

const MIN_PADDLE_POSITION = -3
const MAX_PADDLE_POSITION = 33

interface GameStateProps {
  roomId: string,
  playerName: string,
}

export default function GameStage({roomId, playerName}: GameStateProps) {
  // pass down roomId, playerName as prop, setGameState to fetched gamestate, call paddlePosUpdate on handleKeyDown
  const [paddle, setPaddle] = useState<UpdatePaddleRequest>(DEFAULT_UPDATE_REQUEST)
  const newPaddle = paddle

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const newPositon = Math.min(paddle.paddlePosition + 1, MAX_PADDLE_POSITION)
      
      newPaddle.roomId = roomId
      newPaddle.playerName = playerName
      newPaddle.paddlePosition = newPositon
      setPaddle(newPaddle)
      console.log('DOWN!')
    }
    
    if (e.key === 'ArrowUp') {
      const newPositon = Math.max(paddle.paddlePosition - 1 , MIN_PADDLE_POSITION)

      newPaddle.roomId = roomId
      newPaddle.playerName = playerName
      newPaddle.paddlePosition = newPositon
      setPaddle(newPaddle)
      console.log('UP')
    }
  }, [ newPaddle, paddle, playerName, roomId])

  const sendUpdateRequest = async (paddleReq:UpdatePaddleRequest) => {
    const response = await fetch(`http://localhost:5000/gameStates/${roomId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paddleReq)
    })

    const data:UpdatePaddleRequest = await response.json()
    console.log(data)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    sendUpdateRequest(paddle)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, paddle])

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
