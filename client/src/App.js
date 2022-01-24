import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPageComponent from "./components/LoginPageComponent";
import DoneListComponent from "./components/DoneListComponent";

// TUTORIAL
import "./App.css";
// import ATodoList from "./components/ATodoList";
// import ATodoForm from "./components/ATodoForm";

// TUTORIAL
// function App() {
//   return (
//     <div className="todo-app">
//       <h3>My Awesome Completed App</h3>
//       <ATodoList />
//     </div>
//   );
// }

// MOI

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/login">
          <LoginPageComponent />
        </Route>

        <Route path="/donelist">
          <DoneListComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
