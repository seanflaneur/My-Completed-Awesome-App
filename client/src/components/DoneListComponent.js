import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function DoneListComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userActions, setUserActions] = useState([]);

  useEffect(
    () => {
      if (isAuthenticated) {
        fetch(`accounts/${user.email}/actions/donelist`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setUserActions(json.actions);
          });
      }
    },
    [user]
    //empty list = function will be called only once, when the component first renders
  );

  const doneList = userActions.map((action) => {
    return <div>{action.action}</div>;
  });

  return (
    <div>
      <div>{doneList}</div>
    </div>
  );
}
export default DoneListComponent;
