import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout";
import Notification from "./components/notification";
import Home from "./routes/home";
import Auth from "./routes/auth";

export default class App extends React.Component {
  state = {
    shouldShowNotification: "",
    textOfNotification: ""
  };

  showNotification = (text, type) => {
    if (text === "") {
      this.setState({
        shouldShowNotification: "",
        textOfNotification: ""
      });
    } else {
      this.setState({
        shouldShowNotification: type,
        textOfNotification: text
      });
    }
  };

  closeNotification = () =>
    this.setState({ shouldShowNotification: "", textOfNotification: "" });

  render() {
    return (
      <>
        <Notification
          state={this.state.shouldShowNotification}
          text={this.state.textOfNotification}
          close={this.closeNotification}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Layout>
                <Home showNotification={this.showNotification} />
              </Layout>
            )}
          />
          <Route path="/auth" render={props => <Auth {...props} />} />
        </Switch>
      </>
    );
  }
}
