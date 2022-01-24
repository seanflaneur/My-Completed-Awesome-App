import React from "react";
import LoginButtonComponent from "./LoginButtonComponent";
import LogoutButtonComponent from "./LogoutButtonComponent";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPageComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <div>
        <header>
          <h1>Space to Think</h1>
        </header>
        <br></br>
        <text>
          Actually, for most of you, it’d be a good thing you don’t get two more
          hours. Because the issue is not time.
          <br></br>How long does it take to have a creative idea? Zero time. How
          long does it take to be inspired? Zero time. <br></br>How long does it
          take to recognize an opportunity you could leverage and take advantage
          of? Zero time. <br></br>Time is not the issue for those things. There
          is something required for those things. What’s that? Psychic
          bandwidth. <br></br>You need space to think.
        </text>
        <br></br>
        {/* <text>Login Component</text> */}
        {isAuthenticated ? (
          <div>
            <LogoutButtonComponent />
          </div>
        ) : (
          <LoginButtonComponent />
        )}
      </div>
    </div>
  );
}

export default LoginPageComponent;
