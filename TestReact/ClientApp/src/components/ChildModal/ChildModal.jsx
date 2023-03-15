import React from 'react'
import cl from './ChildModal.module.css'

const ChildModal = ({children, visible, setVisible}) => {

  const rootClasses = [cl.ChildModal]
  if(visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={cl.ChildModalContent}>
        {children}
      </div>
    </div>
  )
}

export default ChildModal;
