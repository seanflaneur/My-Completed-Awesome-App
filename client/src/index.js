import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-h4oket9p.us.auth0.com"
    clientId="qwB5m9t5My58Op9WNFAmt5W22n0fOj1P"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);
