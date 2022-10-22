import { useContext } from 'react'

import { useCount } from '../hooks/useCount'
import { Context } from '../ContextApiData'

export default function GameModal () {
  const { count } = useCount()
  const { openModal, setOpenModal } = useContext(Context)
  console.log(count)
  console.log(openModal)
  return (
    openModal
      ? (
          <div className='modal-shadow' onClick={ () => setOpenModal(null) }>
            <div className='modal-product'>
              { openModal.name }
            </div>
          </div>
        )
      : null
  )
}