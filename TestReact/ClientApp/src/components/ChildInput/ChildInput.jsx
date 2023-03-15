import React from 'react'
import cl from './ChildInput.module.css'

const ChildInput = (props) => {
  return (
        <input className={cl.ChildInput} {...props} />
  )
}
export default ChildInput;