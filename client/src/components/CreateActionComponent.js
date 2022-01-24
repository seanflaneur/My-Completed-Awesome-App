import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CreateActionComponent = ({
  addAction,
  formSubmit,
  action,
  setAction,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // const [action, setAction] = useState("");

  const handleInputChange = (event) => {
    //event can be named anything, but target and value are mandatory
    setAction(event.target.value);
  };

  // const handleFormSubmit = (event) => {
  //   // convention to stop page from refreshing on form's submission
  //   event.preventDefault();

  //   addAction({ title: action });
  //   // then reset the damn input textbox
  //   setAction("");

  //   // FETCH ADDACTION
  //   fetch(`/accounts/${user.email}/actions`, {
  //     method: "POST",
  //     //NOTE BODY REQUIRES USEREMAIL
  //     body: JSON.stringify({ useremail: user.email, action: action }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       addAction(data);
  //     });
  // };
  //////////////

  // req.body = userid, action

  return (
    // KISS basic HTML
    // on form's submission
    <form onSubmit={(e) => formSubmit(e, action)}>
      {/* create divs for CSS later!! */}
      <div>
        <div>
          <input
            type="text"
            placeholder="Create Action"
            //   A Controlled Component is one that takes its current value through props and notifies changes through callbacks like onChange. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component".
            //   A Uncontrolled Component is one that stores its own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML.
            value={action}
            onChange={handleInputChange}
          />
          <button type="submit"> + </button>
        </div>
      </div>
    </form>
  );
};

export default CreateActionComponent;
