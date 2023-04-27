import React, { useEffect, useState, useMemo } from "react";
import FullCalendar from '@fullcalendar/react'
import "./planner.css";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import ChildInput from "../ChildInput/ChildInput";
import ChildModal from "../ChildModal/ChildModal";
import P from "../CalcPa/CalcPa";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


export default function Planner() {

  const [plans, setPlans] = useState([])

  const [addModal, setAddModal] = useState(false)

  const [curDate, setCurDate] = useState("")

  const [finished, setFinished] = useState([])

  const [selectedDate, setSelectedDate] = useState()

  const [newPlan, setNewPlan] = useState({
    id: 0,
    title: "",
    date: ""
  })

  const [test, setTest] = useState([])

  useEffect(() => {
    Get();
  }, []);

  async function Get() {
    const response = await fetch("api/Plans/");
    const data = await response.json();
    console.log(data)

    setPlans(data)
    setTest(data)
    console.log(plans)
    console.log(test)
  }

  async function Add(){
    const data = {
      planid: plans.length+1,
      title: newPlan.title,
      date: newPlan.date
    }

    const response = await fetch("api/Plans",{
      headers: {
        'Content-Type': 'application/json'
      },  
      method: 'POST',
      body: JSON.stringify(data)
    }).then((response)=>{
      if(response.ok){
        
      }
      else{
        alert("error update")
      }
    });
    console.log(data)
    setAddModal(false)
  }

  function Test(){
    console.log(Object.keys(plans).length)
    console.log(plans)
    console.log(test)
  }

  const handelDateClick = (arg) => {
    if(selectedDate === arg.dateStr){
    setCurDate(arg.dateStr)
    console.log(arg.dateStr)
    setNewPlan({
      ...newPlan,
      date: arg.dateStr
    })
    setAddModal(true)
    }else{
    setSelectedDate(arg.dateStr)
    }
  }
  const handleEventClick = (arg) => {
    //console.log(arg.event.id)

  }
  const handleCheckboxChange = (arg) => {

    console.log(arg.target.value)
    console.log(arg.target.disabled)

    arg.target.disabled = true
    setFinished([
      ...finished,
      arg.target.value
    ])

  }

  return (
    <div>
      <ChildModal visible={addModal} setVisible={setAddModal}>
        <form>
          <P style={{textAlign: "left"}}>
            Задача на {newPlan.date}
          </P>
          <ChildInput value={newPlan.title} onChange={e => setNewPlan({
          ...newPlan,
          title: e.target.value
        })} />
        <button style={{marginRight: "5px"}} type="button" class="btn btn-add" onClick={()=>Add()}>
          Добавить
        </button>
        <button type="button" class="btn btn-add" onClick={()=>Add()}>
          Закрыть
        </button>
        </form>
      </ChildModal>
      <button type="button" class="btn btn-add" onClick={Test}>
        Создать
      </button>
      <FullCalendar
          headerToolbar={{
            start: 'dayGridMonth,dayGridWeek', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today,prev,next', // will normally be on the right. if RTL, will be on the left
          }}
          buttonText={{
            month: 'месяц',
            week: 'неделя',
            today: 'сегодня',
          }}
          displayEventTime = {false}
          plugins={[ dayGridPlugin, interactionPlugin, bootstrap5Plugin ]}
          themeSystem = 'bootstrap5'
          initialView="dayGridWeek"
          locale = "ru"
          firstDay={1}
          events={plans}
          selectable={true}
          height={600}
          dateClick={handelDateClick}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </div>
      
  )

  function renderEventContent(eventInfo) {
    return (
      <>
        <input className="form-check-input" type="checkbox" value={eventInfo.event.id} style={{marginRight: "5px"}} onChange={handleCheckboxChange}></input>
        <strong style={{ textDecoration: finished.includes(eventInfo.event.id) ? "line-through" : "none" }}>{eventInfo.event.title}</strong>
      </>
    )
  }
  
}
