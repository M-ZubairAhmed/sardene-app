import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./routes/home";

export default props => (
  <Switch>
    <Layout>
      <Route exact path="/" render={props => <Home />} />
    </Layout>
  </Switch>
);
