import { useState } from 'react'

export function useAddedToCart() {
  const [added, setAdded] = useState('Add to cart')

  return { added, setAdded }
}