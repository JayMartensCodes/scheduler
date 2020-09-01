import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })
  
  const formatSpots = (spots) => {
    return `${spots !== 0 ? spots : "no"} spot${spots !== 1 ? "s" : ""} remaining`
  }

  return (
    <li className={dayListItemClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}