import React, { useEffect, useState, useMemo } from "react";
import ChildInput from "./ChildInput/ChildInput";
import male from '../image/male.svg'
import female from '../image/female.svg'
import '../calculator.css';

export default function Calculator() {

 const [gender, setGender] = useState('')
 const [date, setDate] = useState()
 const [height, setHeight] = useState()
 const [weight, setWeight] = useState()

 const genderHandler = (event) =>{
  setGender(event.target.value)
  console.log(event.target.value)
  console.log(gender)
 }
 function Calc(){
  console.log(gender)
  console.log(date)
  console.log(height)
  console.log(weight)
 }


  return (
    <div>
          <div className={gender === 'boy' ? 'div_male' : 'div_space'}>
            <input className='' type="radio" name="gender" value='boy' onChange={genderHandler} />
            <img className='svg' src={male} />
            <p>Мальчик</p>
          </div>
          <div className={gender === 'girl' ? 'div_female' : 'div_space'}>
            <input className='' type="radio" name="gender" value='girl' onChange={genderHandler} />
            <img className='svg' src={female} />
            <p>Девочка</p>
          </div>
          <ChildInput type="date" placeholder="Дата рождения" 
          onChange={e => setDate(e.target.value)} 
          />
          <ChildInput type="number" placeholder="Вес" 
          onChange={e => setWeight(e.target.value)} 
          />
          <ChildInput type="number" placeholder="Рост" 
          onChange={e => setHeight(e.target.value)} 
          />
          <button type="button" class="btn btn-add" onClick={Calc}>
          Расчитать
          </button>
          {gender}
    </div>
  )
}
