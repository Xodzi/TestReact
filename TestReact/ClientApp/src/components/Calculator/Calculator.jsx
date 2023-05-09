import React, { useEffect, useState, useMemo } from "react";
import ChildInput from "../ChildInput/ChildInput";
import P from "../CalcPa/CalcPa"
import male from '../../image/male.svg'
import female from '../../image/female.svg'
import '../../calculator.css';
import Height from './heightM.json'
import HeightF from './heightF.json'
import Weight from './weight.json'
import IMBJ from './IMB.json'

export default function Calculator() {

 const [gender, setGender] = useState('boy')
 const [date, setDate] = useState()
 const [height, setHeight] = useState()
 const [weight, setWeight] = useState()
 const [age, setAge] = useState({
  years: "",
  months: "",
  weeks: "",
 })

 const [IMB, setIMB] = useState()
 const [IMBclass, setIMBC] = useState()

 const [resH, setResH] = useState({
  class: "",
  status: ""
 })
 const [resW, setResW] = useState({
   class: "",
   status: ""
 })

 const [currentH, setCurrentH] = useState()

 const genderHandler = (event) =>{
  setGender(event.target.value)
  console.log(event.target.value)
  console.log(gender)
 }

 function Calc(){
  if(gender==='boy'){
   ComutHM()
   ComutWM()
   ComutIMB()
  }
  else ComutHF()
  ComutWM()
  ComutIMB()
 }


  return (
    <div>
          <div className={gender === 'boy' ? 'div_male' : 'div_space'} onClick={() => setGender('boy')} >
            <input className='input_male' type="radio" name="gender" value='boy' onChange={genderHandler} />
            <img className='svg' src={male} />
            <p>Мальчик</p>
          </div>
          <div className={gender === 'girl' ? 'div_female' : 'div_space'} onClick={() => setGender('girl')}>
            <input className='input_female' type="radio" name="gender" value='girl' onChange={genderHandler} />
            <img className='svg' src={female} />
            <p>Девочка</p>
          </div>
          <ChildInput type="date" placeholder="Дата рождения" 
          onChange={e => setDate(e.target.value)} 
          />
          <ChildInput style={{width: "20%", marginRight: "10px"}} type="number" placeholder="Лет" value={age.years} onChange={(e)=> setAge({
            ...age,
            years: e.target.value
          })
          }/>
          <ChildInput style={{width: "20%", marginRight: "10px"}} type="number" placeholder="Месяцы" value={age.months} onChange={(e)=> setAge({
            ...age,
            months: e.target.value
          })
          }/>
          <ChildInput style={{width: "20%", marginRight: "10px"}} type="number" placeholder="Недели" value={age.weeks} onChange={(e)=> setAge({
            ...age,
            weeks: e.target.value
          })
          }/>
          <br></br>
          <ChildInput style={{width: "20%", marginRight: "10px"}} type="number" placeholder="Вес"
          value={weight} 
          onChange={e => setWeight(e.target.value)} 
          />
          <ChildInput style={{width: "20%", marginRight: "10px" }} type="number" placeholder="Рост"
          value={height} 
          onChange={e => setHeight(e.target.value)} 
          />
          <button type="button" class="btn btn-add" onClick={Calc}>
          Расчитать
          </button>
          <div className="results">
          <P className={resW.class}>
          Вес: {weight} {resW.status}  <br/>
          </P>
          <P className={resH.class}>
          Рост: {height} {resH.status} <br/>
          </P>
          <P className={IMBclass}>
          ИМТ: {IMB}
          </P>
          </div>
    </div>
  )
          //#region  Hm
  function ComutHM() {
    for (let i = 0; i < Height.length; i++) {
       if (Height[i].year == age.years && Height[i].month == age.months) {
          console.log('sw')
          if (height <= Height[i].verylow) { // vl
             setResH({
                class: 'verylow',
                status: "низкорослый"
             })
             setCurrentH(Height[i])
             return
          } else { //low
            let arr = Height[i].low.split('–')
            let min = parseFloat(arr[0].replace(',','.').replace(' ',''))
            let max = parseFloat(arr[1].replace(',','.').replace(' ',''))
             if (height >= min && height <= max) {
                setResH({
                   class: 'low',
                   status: "ниже нормы"
                })
                setCurrentH(Height[i])
                return
             } else { //med
                let arr = Height[i].medium.split('–')
                let min = parseFloat(arr[0].replace(',','.'))
                let max = parseFloat(arr[1].replace(',','.'))

                console.log(min)
                console.log(max)
                console.log(height)
                if (height >= min && height <= max) {
                   setResH({
                      class: 'medium',
                      status: "норма"
                   })
                   setCurrentH(Height[i])
                   return
                } else { //high
                  let arr = Height[i].higher.split('–')
                  let min = parseFloat(arr[0].replace(',','.'))
                  let max = parseFloat(arr[1].replace(',','.'))
                   if (height >= min && height <= max) {
                      setResH({
                         class: 'higher',
                         status: "выше нормы"
                      })
                      setCurrentH(Height[i])
                      return
                   } else if (height >= Height[i].vetyhigher) { //vh
                      setResH({
                         class: 'veryh',
                         status: "сильно выше нормы"
                      })
                      setCurrentH(Height[i])
                      return
                    }}}}}}
 }

 
function ComutHF() {
  for (let i = 0; i < HeightF.length; i++) {
     if (HeightF[i].year == age.years && HeightF[i].month == age.months) {
        console.log('sw')
        if (height <= HeightF[i].verylow) { // vl
           setResH({
              class: 'verylow',
              status: "низкорослый"
           })
           setCurrentH(Height[i])
        } else { //low
         let arr = Height[i].low.split('–')
         let min = parseFloat(arr[0].replace(',','.'))
         let max = parseFloat(arr[1].replace(',','.'))
           if (height >= min && height <= max) {
              setResH({
                 class: 'low',
                 status: "ниже нормы"
              })
              setCurrentH(Height[i])
           } else { //med
            let arr = Height[i].medium.split('–')
            let min = parseFloat(arr[0].replace(',','.'))
            let max = parseFloat(arr[1].replace(',','.'))
              if (height >= min && height <= max) {
                 setResH({
                    class: 'medium',
                    status: "норма"
                 })
                 setCurrentH(Height[i])
              } else { //high
               let arr = Height[i].higher.split('–')
               let min = parseFloat(arr[0].replace(',','.'))
               let max = parseFloat(arr[1].replace(',','.'))
                 if (height >= min && height <= max) {
                    setResH({
                       class: 'higher',
                       status: "выше нормы"
                    })
                    setCurrentH(Height[i])
                 } else if (height >= HeightF[i].vetyhigher) { //vh
                    setResH({
                       class: 'veryh',
                       status: "сильно выше нормы"
                    })
                    setCurrentH(Height[i])
                 }}}}}}
}
  //#endregion Hm
//#region CW
function ComutWM() {
   for (let i = 0; i < Weight.length; i++) {
      if (Weight[i].year == age.years && Weight[i].month == age.months) {
         console.log('sw')
         if (weight <= Weight[i].verylow) { // vl
            setResW({
               class: 'verylow',
               status: "низкорослый"
            })
            //setCurrentH(Height[i])
            return
         } else { //low
           let arr = Weight[i].low.split('–')
           let min = parseFloat(arr[0].replace(',','.').replace(' ',''))
           let max = parseFloat(arr[1].replace(',','.').replace(' ',''))
            if (weight >= min && weight <= max) {
               setResW({
                  class: 'low',
                  status: "ниже нормы"
               })
               //setCurrentH(Height[i])
               return
            } else { //med
               let arr = Weight[i].medium.split('–')
               let min = parseFloat(arr[0].replace(',','.'))
               let max = parseFloat(arr[1].replace(',','.'))
               if (weight >= min && weight <= max) {
                  setResW({
                     class: 'medium',
                     status: "норма"
                  })
                  //setCurrentH(Height[i])
                  return
               } else { //high
                 let arr = Weight[i].higher.split('–')
                 let min = parseFloat(arr[0].replace(',','.'))
                 let max = parseFloat(arr[1].replace(',','.'))
                  if (weight >= min && weight <= max) {
                     setResH({
                        class: 'higher',
                        status: "выше нормы"
                     })
                     //setCurrentW(Weight[i])
                     return
                  } else if (weight >= Weight[i].vetyhigher) { //vh
                     setResW({
                        class: 'veryh',
                        status: "сильно выше нормы"
                     })
                     //setCurrentH(Height[i])
                     return
                   }}}}}}
}
function ComutIMB(){
   let temp = (height/100) * (height/100)
   setIMB(Math.floor(weight/temp))
   if(IMB <= IMBJ.low){
      setIMBC('verylow')
   }
   else{
      if(IMB < IMBJ.medium){
         setIMBC('low')
      }
      else{
         if(IMB < IMBJ.higher){
            setIMBC('medium')
         }
         else{
            if(IMB < IMBJ.vetyhigher){
               setIMBC('higher')
            }
            else{
               setIMBC('veryh')
            }
         }
      }
   }
   return
}


}
