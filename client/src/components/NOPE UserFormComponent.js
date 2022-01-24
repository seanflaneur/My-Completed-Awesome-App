import React from "react";
import { useState } from "react";

const NopeUserFormComponent = (addUser) => {
  const [newUser, setNewUser] = useState("");
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    //event can be named anything, but target and value are mandatory
    // setNewUser(event.target.value);
    // console.log(event.target.value);
    // console.log(event.target.nickname);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      [event.target.nickname]: event.target.value,
    });
  };
  console.log(formData);

  const handleFormSubmit = (event) => {
    // stop page from refreshing on form's submission
    event.preventDefault();
    // addUser({ name: newUser });
    //   addUser ({ _id, name, nickname, email, motto });
    //
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* create divs for CSS later!! */}
      <div>
        <div>
          {/* QUESTION: SIGN-UP SITE, SIGN-IN SITE, ACCOUNT DETAILS SITE */}

          <input
            type="text"
            placeholder="Name"
            //   A Controlled Component is one that takes its current value through props and notifies changes through callbacks like onChange. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component".
            //   A Uncontrolled Component is one that stores its own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML.
            // value={name}
            name="name"
            onChange={handleInputChange}
          />
          <br></br>
          <input
            type="text"
            placeholder="Nickname"
            name="nickname"
            onChange={handleInputChange}
          />
          <br></br>
          <input
            type="text"
            placeholder="Email"
            name="Email"
            onChange={handleInputChange}
          />
          <br></br>
          <input
            type="text"
            placeholder="Motto"
            name="Motto"
            onChange={handleInputChange}
          />
          <br></br>
          <button type="submit"> Create Your Account </button>
        </div>
      </div>
    </form>
  );
};

export default NopeUserFormComponent;
