'use client'
import { useQuery } from 'react-query'
import RoomCreationForm from '../components/RoomCreationForm'
import GameRoomsTable from '../components/GameRoomsTable'
import { GameState } from '../types'


const GameRoomPage = () => {
  const gameStatesQuery = useQuery<GameState[]>('gameStates', () =>
    fetch('/api/gameStates',
    {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
      }
    }).then(res =>
      res.json()
    )
  )

  if (gameStatesQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (gameStatesQuery.isError){
    return <div>ERROR</div>
  }

  if (!gameStatesQuery.data) {
    return <div>MISSING DATA</div>
  }

  const data = gameStatesQuery.data

  return <div>
    <>
      <h1 className='py-4'> Create a new, empty room or join one below</h1>
      <h3 className='py-4 pb-4'> <RoomCreationForm /> </h3>
      {!gameStatesQuery.isLoading
        ? <h1 className='py-4'>There&apos;s {gameStatesQuery.data?.length} games availble</h1>
        : <h1 className='py-4'>Loading games...</h1>
      }
      <GameRoomsTable gameRooms={data}/>
    </>
  </div>
}

export default GameRoomPage