import React, { useEffect } from 'react'
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  const save = (name, interviewer) => {
    transition(SAVE);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)) 
    .catch(error => transition(ERROR_SAVE, true))   
  }

  const cancel = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  const promptConfirm = () => {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={promptConfirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save}        
        />
      )}
      {mode === SAVE && (
        <Status message="Saving" />
      )}
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?" 
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={back} />
      )}
    </article>
  );
}