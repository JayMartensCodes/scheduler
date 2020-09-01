import React from "react";
import DayListItem from "./DayListItem"

export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
    <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={(event) => props.setDay(day.id)}  />
    )
  })
  return (
    <ul>
      {dayList}
    </ul>
  )
}