import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./routes/home";
import Auth from "./routes/auth";

export default props => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <Layout>
          <Home />
        </Layout>
      )}
    />
    <Route path="/auth" render={props => <Auth {...props} />} />
  </Switch>
);
