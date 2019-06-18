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

const NavigationBar = () => {
  const username = localStorage.getItem("username");
  const isAuth = localStorage.getItem("accessToken") ? true : false;
  return (
    <nav className="border split-nav margin-large">
      <div className="nav-brand">
        <Link to="/">
          <h4>Sardene</h4>
        </Link>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <button>
          <label htmlFor="collapsible1">
            {" "}
            <div className="bar2" />
            <div className="bar3" />
          </label>
        </button>
        <div className="collapsible-body">
          <ul className="inline">
            {isAuth ? (
              <Link to="/myideas">
                <li popover-bottom="Go to Profile">Hi, {username}</li>
              </Link>
            ) : (
              <a href={getGihubLoginURL()} target="_self">
                <li>Login with Github</li>
              </a>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

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
