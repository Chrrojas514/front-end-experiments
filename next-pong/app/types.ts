export type GameState = {
  roomName: string;
  roomId: string;
  playerA: string;
  playerB: string;
  ballPositionX: number;
  ballPositionY: number;
  playerAPaddlePosition: number;
  playerBPaddlePosition: number;
}

export const DEFAULT_GAME_STATE: GameState = {
    roomName: "",
    roomId: "",
    playerA: "",
    playerB: "",
  
    ballPositionX: 0,
    ballPositionY: 0,
  
    playerAPaddlePosition: 0,
    playerBPaddlePosition: 0
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