import React, { useEffect } from 'react'
import ky from 'ky'

export const Button: React.FC = () => {
  useEffect(() => {
    console.log('test mounted')
    ky.get('https://dummyjson.com/products').json().then((data) => {
      console.log('ky.get -> data', data)
    })
  }, [])

  function onClick() {
    console.log('first')
  }
  
  return (
    <button onClick={onClick}><span>My button</span></button>
  )
}
