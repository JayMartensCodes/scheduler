import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state, day: action.day }
        case SET_APPLICATION_DATA:
          return {
            ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers 
          }
          case SET_INTERVIEW:
            const appointment = {
              ...state.appointments[action.id],              
              interview: action.interview ? {...action.interview} : null              
            };
            const appointments = {
              ...state.appointments,
              [action.id]: appointment
            };
            const days = [...state.days]
            days.forEach((day) => {
              day.spots = 5
              day.appointments.forEach((id) => {
                if (appointments[id].interview) {
                  day.spots--;
                }
              })
            })
            return {
              ...state, appointments: appointments, days
            }
          default:
            throw new Error(
              `Tried to reduce with unsupported action type: ${action.type}`
            );
    }
  }

  const setDay = day => dispatch({ type: SET_DAY, day});

  const bookInterview = (id, interview = null) => {
    const appointment = {
      ...state.appointments[id],              
      interview: interview            
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id});
      })
  }

  useEffect(() => {    
    Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then(all => {
        const days = all[0].data
        const appointments = all[1].data
        const interviewers = all[2].data
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });        
      })
      .catch(err => console.log(err));

      const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

      webSocket.onmessage = function (event) {
        const serverMessage = JSON.parse(event.data)
        dispatch({ ...serverMessage })      
      }

  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}