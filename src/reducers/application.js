export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview ? { ...action.interview } : null,
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };
      const days = [...state.days];
      days.forEach((day) => {
        day.spots = 5;
        day.appointments.forEach((id) => {
          if (appointments[id].interview) {
            day.spots--;
          }
        });
      });
      return {
        ...state,
        appointments: appointments,
        days,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
