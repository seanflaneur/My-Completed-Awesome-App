import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// pass remoteTodo from app to list props to each todo
function IndividualActionComponent({
  title,
  onCompletedClick,
  onDeletedClick,
  onStarClick,
  id,
  priority,
}) {
  // set false to ordinarily display todo componenet
  const [edit, setEdit] = useState(false);

  const [action, setAction] = useState(title);
  const [draftAction, setDraftAction] = useState(title);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // default false until deleted
  // const [deleted, setDeleted] = useState(false);
  // ditto default false until completed
  const [completedState, setCompletedState] = useState(false); //

  // make a function that runs on clicking
  const handleDoubleClick = () => {
    setEdit(true);
  };

  //EDITACTION / UPDATEACTION
  const handleKeyDown = (event, id) => {
    const key = event.keyCode;
    if (key === 13) {
      setAction(draftAction);
      setEdit(false);
      // JSON.stringify( {action : //value that I typed it//setAction })
      fetch(`/accounts/${user.email}/actions/${id}`, {
        method: "PUT",
        // NOTE BODY REQUIRES USEREMAIL
        body: JSON.stringify({ useremail: user.email, action: draftAction }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res.json);
          return res.json();
        })
        .then((data) => {
          console.log(data.action);
          setAction(data.action);
        });
    } else if (key === 27) {
      setDraftAction(action);
      setEdit(false);
    }
  };

  //EDIT ACTION
  const handleOnChange = (event) => {
    setDraftAction(event.target.value);
  };

  //COMPLETE ACTION
  const handleCompletedClick = (event) => {
    // setCompletedState(true);
    onCompletedClick(id);
  };

  //DELETE ACTION
  const handleDeletedClick = (event) => {
    onDeletedClick(id);
  };

  //STAR ACTION
  const handleStarClick = (event) => {
    onStarClick(id);
  };

  return (
    // if edit state true/on then render input, ELSE render IndividualActionComponent
    //.....
    edit ? (
      <div>
        <div onDoubleClick={handleDoubleClick}>
          <input
            onChange={handleOnChange}
            autoFocus={true}
            onKeyDown={(e) => handleKeyDown(e, id)}
            value={draftAction}
          />
        </div>
      </div>
    ) : (
      <div>
        <div onDoubleClick={handleDoubleClick}>
          <div>
            <div>{action}</div>
            <button onClick={handleStarClick}>
              {priority === true ? "🌟" : "⭐"}
            </button>
            <button onClick={handleCompletedClick}>✔️</button>
            <button onClick={handleDeletedClick}>❌ Delete</button>
          </div>
        </div>
      </div>
    )
  );
}

export default IndividualActionComponent;
