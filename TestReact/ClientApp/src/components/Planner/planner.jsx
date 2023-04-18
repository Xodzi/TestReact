import React, { useEffect, useState, useMemo } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function Planner() {

  const [plans, setPlans] = useState([])

  useEffect(() => {
    Get();
  }, []);

  async function Get() {
    const response = await fetch("api/Plans/");
    const data = await response.json();
    console.log(data)

    let temp = [{
      title: "",
      date: ""
    }]

    for(let i=0;i<Object.keys(data).length;i++){
      temp[i].title = data[i].title
      console.log(temp[i].title)
      temp[i].date = data[i].date
    } 
    console.log(temp)
    setPlans(temp)
  }

  function Test(){

  }

  return (
    <div>
    <button type="button" class="btn btn-add" onClick={Test}>
          Создать
    </button>
    <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale = "ru"
        firstDay={1}
        events={plans}
      />


      </div>
      
  )
}
