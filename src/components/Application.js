import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Camilo Gomez",
      interviewer: { 
        id: 4, 
        name: "Cohana Roy", 
        avatar: "https://i.imgur.com/FK8V841.jpg" 
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Ramiro Quai",
      interviewer: {
        id: 5, 
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg" 
      }
    }
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  const appointmentComponents = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />
  })

  useEffect(() => {
    axios.get('/api/days')
    .then(res => {
      setDays(res.data)
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">        
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />        
      </section>
      <section className="schedule">
        {appointmentComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
