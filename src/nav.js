import React from "react";

export default props => {
  return (
    <nav className="border split-nav margin-large">
      <div className="nav-brand">
        <h4>Sardene</h4>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <button>
          <label for="collapsible1">
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </label>
        </button>
        <div className="collapsible-body">
          <ul className="inline">
            <li popover-bottom="View source code">Source</li>
            {props.auth ? (
              <li popover-bottom="Go to Profile">Hi, Zubair</li>
            ) : (
              <li popover-bottom="Login with Github">Login</li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
