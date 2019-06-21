import React from "react";
import { Redirect } from "react-router-dom";
import qs from "query-string";

import Loader from "../components/loader";

const NO_CODE = "NO_GITHUB_CODE";
const AUTH_OK = "GITHUB_AUTHENTICATED";
const ERROR = "ERROR_IN_AUTH";

const TopBar = () => (
  <div className="split-nav margin-large">
    <div className="nav-brand">
      <h4>Sardene</h4>
    </div>
  </div>
);

export default class Auth extends React.Component {
  state = {
    redirectStatus: ""
  };

  async sendCodeToServer(code) {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/auth`;
      const data = { code };

      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
      });

      const response = await request.json();

      if (response && response.status === 200 && response.data) {
        const { access_token, id, login, name, token_type } = response.data;
        if (access_token) {
          localStorage.setItem("accessToken", access_token);
        }
        if (token_type) {
          localStorage.setItem("tokenType", token_type);
        }
        if (id) {
          localStorage.setItem("githubUUID", id);
        }
        if (login) {
          localStorage.setItem("githubUsername", login);
        }
        if (name) {
          localStorage.setItem("username", name);
        }
        return null;
      } else {
        return response;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async componentDidMount() {
    const {
      location: { search: githubCode },
      location
    } = this.props;

    const query = qs.parse(githubCode);
    const githubAuthCode = query.code;
    if (location && githubCode && githubAuthCode) {
      const errorInRetrievingAccess = await this.sendCodeToServer(
        githubAuthCode
      );

      if (errorInRetrievingAccess === null) {
        await this.setState({
          redirectStatus: AUTH_OK
        });
      } else {
        await this.setState({
          redirectStatus: ERROR
        });
      }
    } else {
      this.setState({
        redirectStatus: NO_CODE
      });
    }
  }
  render() {
    return (
      <div>
        <header>
          <TopBar />
        </header>
        <section className="row flex-center">
          <div className="col text-center">
            <h2>Authorizing</h2>
            <Loader loadingText="Please do not refresh the page while we securely autherize you" />
            <h4>
              Heads up! We do not keep any of your credentials (except github
              uuid) on our systems.
            </h4>
          </div>
        </section>
        {(this.state.redirectStatus === NO_CODE ||
          this.state.redirectStatus === AUTH_OK) && <Redirect to="/" />}
        {this.state.redirectStatus === ERROR && <Redirect to="/error" />}
      </div>
    );
  }
}
