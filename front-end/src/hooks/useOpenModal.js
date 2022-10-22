import { useState } from 'react'

export function useOpenModal () {
  const [openModal, setOpenModal] = useState(null)
  
  return { openModal, setOpenModal }
}