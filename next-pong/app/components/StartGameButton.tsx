import React from 'react'

function StartGameButton(roomId:string) {

  const startGame = async (roomId:string) => {
    const response = await fetch(`http://localhost:5000/startGame`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomId)
    })
    const data = response.json()
    console.log(JSON.stringify(roomId))
  }

  const handleClick = async () => {
    await startGame(roomId)
  }

  return (
    <>
      <button
        className='btn btn-secondary'
        onClick={async () => {await handleClick()}}>
          Start Game Button
      </button>
    </>
  )
}

export default StartGameButton