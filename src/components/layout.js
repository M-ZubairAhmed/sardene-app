import React from "react";
import { Link } from "react-router-dom";
import qs from "query-string";

const getGihubLoginURL = () => {
  const baseURL = "https://github.com/login/oauth/authorize";
  let query = {};
  query.client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  query.redirect_uri = process.env.REACT_APP_REDIRECT_URL;
  const queries = qs.stringify(query);
  return `${baseURL}?${queries}`;
};

const NavigationBar = props => (
  <nav className="border split-nav margin-large">
    <div className="nav-brand">
      <Link to="/">
        <h4>Sardene</h4>
      </Link>
    </div>
    <div className="collapsible">
      <input id="collapsible1" type="checkbox" name="collapsible1" />
      <button>
        <label for="collapsible1">
          {" "}
          <div className="bar2" />
          <div className="bar3" />
        </label>
      </button>
      <div className="collapsible-body">
        <ul className="inline">
          <Link to="/privacy">
            <li popover-bottom="View Privacy statement">Privacy</li>
          </Link>
          <Link to="/source">
            <li popover-bottom="View source code">Source</li>
          </Link>
          {props.auth ? (
            <Link to="/myideashnv  ">
              <li popover-bottom="Go to Profile">Hi, Zubair</li>
            </Link>
          ) : (
            <a href={getGihubLoginURL()} target="__blank">
              <li popover-bottom="Login with Github">Login</li>
            </a>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
          <NavigationBar />
        </header>
        <main>{this.props.children}</main>
      </>
    );
  }
}
