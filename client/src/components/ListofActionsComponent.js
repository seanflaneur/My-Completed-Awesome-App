import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import IndividualActionComponent from "./IndividualActionComponent";

function ListOfActionsComponent({
  list,
  removeActionList,
  onCompletedClick,
  onDeletedClick,
  onStarClick,
  focusAction,
  // runPomodoro,
  onTimerFinish,
  currentState,
}) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userActions, setUserActions] = useState([]);

  // console.log(" toggle ", focusAction);
  const updatedList = currentState === "focus" ? [list[focusAction]] : list;
  const savedList = updatedList.map((action) => {
    return (
      //conditional rendering if
      <IndividualActionComponent
        title={action.action}
        id={action._id}
        key={action._id}
        priority={action.priority}
        // completed={action.completed}
        onCompletedClick={onCompletedClick}
        onDeletedClick={onDeletedClick}
        onStarClick={onStarClick}
        removeActionIndividual={(action) => removeActionList(action._id)}
      />
    );
  });

  return (
    <div>
      <div>{currentState === "relax" ? <div></div> : savedList}</div>
    </div>
  );
}

export default ListOfActionsComponent;
