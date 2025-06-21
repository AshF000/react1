import React from 'react'
import Input from './Input'
import Button from './Button'

const Modal = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40'>
        <div className='flex justify-evenly items-center'>

        <Input/>
        <Button work={"Done"} css={"bg-white"}  />
        <Button work={"Cancel"} css={"bg-white"} />
        </div>
        
    </div>
  )
}

export default Modal