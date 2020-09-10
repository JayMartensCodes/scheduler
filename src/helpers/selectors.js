export function getAppointmentsForDay(state, day) {
  let result = [];
  const filteredDays = state.days.filter((res) => res.name === day);
  const appointments = filteredDays[0] && filteredDays[0].appointments;
  appointments &&
    appointments.forEach((appointment) => {
      result.push(state.appointments[appointment]);
    });

  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  const filteredDays = state.days.filter((res) => res.name === day);
  const interviewers = filteredDays[0] && filteredDays[0].interviewers;
  interviewers &&
    interviewers.forEach((interviewer) => {
      result.push(state.interviewers[interviewer]);
    });

  return result;
}

export function getInterview(state, interview) {
  return interview
    ? {
        student: interview.student,
        interviewer: {
          ...state.interviewers[interview.interviewer],
        },
      }
    : null;
}
