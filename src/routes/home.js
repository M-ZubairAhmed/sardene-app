import React from "react";

import Search from "../components/search";
import IdeaList from "../components/list";
import AddIdea from "../components/add-idea";
import Fab from "../components/fab";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
const ENUM_EMPTY = "EMPTY_IDEAS";
const ENUM_ERROR = "ERROR";

const Hero = () => (
  <div className="row flex-center margin-bottom-large text-center">
    <h2 className="margin margin-bottom-none ">
      Find your next idea to hack on this weekend
    </h2>
  </div>
);

export default class Home extends React.Component {
  state = {
    isAddNewModalOpen: false,
    networkState: ENUM_LOADING,
    ideas: []
  };

  toggleAddNewModal = () =>
    this.setState({ isAddNewModalOpen: !this.state.isAddNewModalOpen });

  async getIdeas() {
    await this.setState({
      networkState: ENUM_LOADING,
      ideas: []
    });
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/ideas`;
      const request = await fetch(url);
      const response = await request.json();
      if (response.status && response.status === 200) {
        if (response.count === 0) {
          await this.setState({
            ideas: [],
            networkState: ENUM_EMPTY
          });
        } else {
          await this.setState({
            ideas: response.data.sort((a, b) => b.created_at - a.created_at),
            networkState: ENUM_COMPLETE
          });
        }
      }
    } catch (err) {
      console.error(err);
      await this.setState({
        ideas: [],
        networkState: ENUM_ERROR
      });
    }
  }

  async submitIdea(idea) {
    const url = `${process.env.REACT_APP_BASE_URL}/idea/add`;
    const accessToken = `${localStorage.getItem("accessToken")}`;

    try {
      const request = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(idea)
      });
      const response = await request.json();
      if (response.status === 201) {
        this.props.showNotification("Idea submitted successfully", "success");
        this.getIdeas();
      } else {
        throw response;
      }
    } catch (err) {
      console.error(err);
      this.props.showNotification(
        "Idea couldnt be submitted due to some error",
        "danger"
      );
    }
  }

  submitIdeaToServerClicked = idea => {
    this.toggleAddNewModal();
    this.props.showNotification(
      "We are uploading your idea in the background, we will let you know once its submitted",
      "primary"
    );
    this.submitIdea(idea);
  };

  componentDidMount() {
    this.getIdeas();
  }

  render() {
    return (
      <>
        <Hero />
        {/* TODO: later search will be implemented */}
        {/* <aside>
          <Search />
        </aside> */}
        <section>
          <IdeaList
            ideas={this.state.ideas}
            networkState={this.state.networkState}
          />
        </section>
        <aside>
          <Fab openAddNewModal={this.toggleAddNewModal} />
        </aside>
        <AddIdea
          showModal={this.state.isAddNewModalOpen}
          toggleAddNewModal={this.toggleAddNewModal}
          submitIdeaToServer={this.submitIdeaToServerClicked}
        />
      </>
    );
  }
}
