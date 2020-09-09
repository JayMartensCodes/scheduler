import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";



export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



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