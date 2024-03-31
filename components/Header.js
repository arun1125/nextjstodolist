import React, {useEffect, useState} from 'react'
import Modal from './Modal'


export default function Header() {
  const [openModal, setOpenModal] = useState(false)

  return (
      <>
        
        <div className = 'sticky top-0 w-full left-0 flex items-center justify-between p-4 bg-inherit border-b border-solid border-white'>
            <h1 className = 'text-4xl sm:text-6xl select-none'>
                TODO LIST
            </h1>
            <i onClick = {()=>setOpenModal(true)} className="fa-regular fa-user p-4 text-2xl sm:text-4xl duration-300 hover:opacity-40 cursor-pointer"></i>
        </div>
        {openModal && <Modal setOpenModal = {setOpenModal}/>}
      </>
  )
}
