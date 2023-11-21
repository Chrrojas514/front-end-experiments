export type GameState = {
  roomName: string,
  playerA: string,
  playerB: string,
  playerAPaddlePosition: number,
  playerBPaddlePosition: number,
  playerAScore: number,
  playerBScore: number,
  ballPositionX: number,
  ballPositionY: number,
  ballVelocityX: number,
  ballVelocityY: number,
  gameStarted: boolean,
  gameOver: boolean,
  roomId: string,
}

// @ts-ignore roomId is set by backend, request needs to NOT send a roomId
export const DEFAULT_GAME_STATE: GameState = {
  roomName: "",
  playerA: "",
  playerB: "",
  playerAPaddlePosition: 54,
  playerBPaddlePosition: 54,
  playerAScore: 0,
  playerBScore: 0,
  ballPositionX: 50,
  ballPositionY: 50,
  ballVelocityX: 0,
  ballVelocityY: 0,
  gameStarted: false,
  gameOver: false,
  }

export type UpdatePaddleRequest = {
    roomId: string,
    playerName: string,
    paddlePosition: number
  }
  
export const DEFAULT_UPDATE_REQUEST: UpdatePaddleRequest = {
    roomId: "",
    playerName: "",
    paddlePosition: 12
  }