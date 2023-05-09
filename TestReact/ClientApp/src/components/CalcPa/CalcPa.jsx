import React from 'react'
import cl from './CalcPa.module.css'
import './calc.css'

const CalcPa = (props) => {
  return (
        <p className={cl.CalcPa} {...props} />
  )
}
export default CalcPa;