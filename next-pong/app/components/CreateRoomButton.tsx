'use client';
import React from 'react'

const CreateRoomButton = () => {
  return (
    <button
      className='p-1 my-1 border-solid bg-slate-400 text-center text-black hover:bg-slate-500'
      onClick={() => {console.log('CLICKED')}}>
        create room
    </button>
  )
}

export default CreateRoomButton