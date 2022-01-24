import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateActionComponent from "./CreateActionComponent";
import ListOfActionsComponent from "./ListofActionsComponent";
import PomodoroComponent from "./PomodoroComponent";
// import LoginButtonComponent from "./components/LoginButtonComponent";
// import LogoutButtonComponent from "./components/LogoutButtonComponent";
import DoneListComponent from "./DoneListComponent";

//Github Testing, Testing, 1, 2, 3

function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userActions, setUserActions] = useState([]);
  const [action, setAction] = useState("");
  const [focusAction, setFocusAction] = useState(0);
  const [currentState, setCurrentState] = useState("idle");
  const [createCounter, setCreateCounter] = useState(1);
  const [runPomodoro, setRunPomodoro] = useState();

  const handleTimerFinish = () => {
    if (currentState === "focus") {
      setCurrentState("relax");
    } else if (currentState === "relax") {
      setCurrentState("focus");
    }
  };

  const background = () => {
    if (currentState === "relax") {
      <div
        style={{
          backgroundColor: "black",
        }}
      />;
    } else {
      <div
        style={{
          backgroundColor: "white",
        }}
      />;
    }
  };

  const handlePomodoroStart = () => {
    // setRunPomodoro(true);
    setCurrentState("focus");
    setFocusAction(0);
  };

  const handlePomodoroStop = () => {
    // setRunPomodoro(false);
    setCurrentState("idle");
  };

  const handlePomodoroForward = () => {
    console.log("Hello World");
    setFocusAction(focusAction + 1);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (createCounter) {
        fetch(`accounts/${user.email}/actions`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((json) => {
            const prioritizedActionsList = prioritizeAction(json.actions);
            setUserActions(prioritizedActionsList);
            // setUserActions(json.actions);
            // console.log(json.actions);
          });
        // }
      }
    }
  }, [user]);

  const addAction = (item) => {};

  const handleFormSubmit = (event, action) => {
    // convention to stop page from refreshing on form's submission
    event.preventDefault();

    addAction({ title: action });
    // then reset the damn input textbox
    setAction("");

    // FETCH ADDACTION
    fetch(`/accounts/${user.email}/actions/:_id`, {
      method: "POST",
      //NOTE BODY REQUIRES USEREMAIL
      body: JSON.stringify({ useremail: user.email, action: action }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        setCreateCounter(createCounter + 1);
      })
      .then((data) => {
        addAction(data);
      });
  };

  const prioritizeAction = (actions) => {
    const prioritizedActions = actions.filter(
      (action) => action.priority === true
    );
    const unprioritizedActions = actions.filter(
      (action) => action.priority === false
    );
    return prioritizedActions.concat(unprioritizedActions);
    //array1.concat(array2)
  };

  const handleStarClick = (id) => {
    // PRIORITY
    fetch(`/accounts/${user.email}/actions/${id}/star`, {
      method: "POST",
      // body: JSON.stringify({ useremail: user.email, action: setAction }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const newUserActions = userActions.map((action) => {
        if (action._id === id) {
          return { ...action, priority: true };
        } else {
          return action;
        }
      });
      const prioritizedActionsList = prioritizeAction(newUserActions);
      setUserActions(prioritizedActionsList);
    });
  };

  const handleDeletedClick = (id) => {
    fetch(`/accounts/${user.email}/actions/${id}`, {
      method: "DELETE",
      // body: JSON.stringify({ useremail: user.email, action: setAction }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // return res.json();
      const newUserActions = userActions.filter((action) => action._id !== id);
      const prioritizedActionsList = prioritizeAction(newUserActions);
      setUserActions(prioritizedActionsList);
    });
  };
  const handleCompletedClick = (id) => {
    fetch(`/accounts/${user.email}/actions/${id}/complete`, {
      method: "POST",
      // body: JSON.stringify({ useremail: user.email, action: setAction }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // return res.json();
      const newUserActions = userActions.filter((action) => action._id !== id);
      const prioritizedActionsList = prioritizeAction(newUserActions);
      setUserActions(prioritizedActionsList);
    });
    // .then((data) => {
    //   setAction(data);
    // });
  };

  return (
    <div>
      <br></br>
      <CreateActionComponent
        action={action}
        setAction={setAction}
        formSubmit={handleFormSubmit}
      />
      <br></br>

      {userActions.length <= 0 ? (
        <h1>You can relax now</h1>
      ) : (
        <div>
          <br></br>
          {/* <text>Pomodoro Component</text> */}
          <PomodoroComponent
            // setRunPomodoro={setRunPomodoro}
            // updateActions={updateActions}
            // resetActions={resetActions}
            onTimerFinish={handleTimerFinish}
            currentState={currentState}
            onPomodoroStart={handlePomodoroStart}
            onPomodoroStop={handlePomodoroStop}
            onPomodoroForward={handlePomodoroForward}
          />
          <br></br>
          <ListOfActionsComponent
            list={userActions}
            onCompletedClick={handleCompletedClick}
            onDeletedClick={handleDeletedClick}
            onStarClick={handleStarClick}
            focusAction={focusAction}
            // runPomodoro={runPomodoro}
            onTimerFinish={handleTimerFinish}
            currentState={currentState}
          />
          <br></br>
          <br></br>
        </div>
      )}

      <br></br>
    </div>
  );
}

export default HomePage;
