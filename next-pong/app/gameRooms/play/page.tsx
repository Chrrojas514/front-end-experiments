// 'use client'
// import React from 'react'

// const PlayPage = () => {
//   return (
//     <div>PlayPage</div>
//   )
// }

// export default PlayPage

'use client'

import { CSSProperties, useCallback, useEffect, useState } from 'react';

type GameState = {
  ballPositionX: number;
  ballPositionY: number;
  
  playerAPaddlePosition: number;
  playerBPaddlePosition: number;
}

const DEFAULT_GAME_STATE: GameState = {
  ballPositionX: 0,
  ballPositionY: 0,

  playerAPaddlePosition: 0,
  playerBPaddlePosition: 0
}

const BASE_PADDLE_STYLES: CSSProperties = {width: '12px', height: '120px', backgroundColor: 'white'}

const MIN_PADDLE_POSITION = 0;
const MAX_PADDLE_POSITION = 40;

export default function PlayView() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const newPositon = Math.min(gameState.playerAPaddlePosition + 1, MAX_PADDLE_POSITION)
      
      setGameState({...gameState, playerAPaddlePosition: newPositon})
    }
    
    if (e.key === 'ArrowUp') {
      const newPositon = Math.max(gameState.playerAPaddlePosition - 1 , MIN_PADDLE_POSITION)

      setGameState({...gameState, playerAPaddlePosition: newPositon})
    }
  }, [gameState])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown])

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      border: '1px solid white',
      padding: '40px',
      width: '600px',
      height: '500px'
    }}>
      <div style={{...BASE_PADDLE_STYLES, marginTop: gameState.playerAPaddlePosition * 10}}></div>
      <div style={{ border: '2px dashed white'}}></div>
      <div style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        backgroundColor: 'white',
        top: 150,
        left: 450,
      }}></div>
      <div style={{...BASE_PADDLE_STYLES}}></div>
    </div>
  )
}
