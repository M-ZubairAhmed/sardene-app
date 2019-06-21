import React from "react";

// import Search from "../components/search";
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
    ideas: [],
    userLikedIdeas: []
  };

  toggleAddNewModal = () =>
    this.setState({ isAddNewModalOpen: !this.state.isAddNewModalOpen });

  async getLikedIdeas() {
    try {
      const accessToken = `${localStorage.getItem("accessToken")}`;
      const GAZED_IDEAS_URL = `${process.env.REACT_APP_BASE_URL}/ideas/gazed`;
      const requestGazedIdeas = await fetch(GAZED_IDEAS_URL, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        })
      });
      const gazedIdeas = await requestGazedIdeas.json();
      if (gazedIdeas.status === 200) {
        this.setState({
          userLikedIdeas: gazedIdeas.data ? gazedIdeas.data : []
        });
      }
    } catch (err) {}
  }

  async getIdeas() {
    await this.setState({
      networkState: ENUM_LOADING,
      ideas: []
    });
    try {
      const ALL_IDEAS_URL = `${process.env.REACT_APP_BASE_URL}/ideas`;
      const requestAllIdeas = await fetch(ALL_IDEAS_URL);

      const allIdeas = await requestAllIdeas.json();

      if (allIdeas.status && allIdeas.status === 200) {
        if (allIdeas.count === 0) {
          await this.setState({
            ideas: [],
            networkState: ENUM_EMPTY
          });
        } else {
          this.getLikedIdeas();
          await this.setState({
            ideas: allIdeas.data.sort((a, b) => b.created_at - a.created_at),
            networkState: ENUM_COMPLETE
          });
        }
      } else {
        // eslint-disable-next-line
        throw new String("todo, error not handled");
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

  likeClicked = async ideaID => {
    const { ideas, ideas: ideasBeforeLiking } = this.state;
    const accessToken = `${localStorage.getItem("accessToken")}`;

    if (localStorage.getItem("accessToken") === null) {
      this.props.showNotification("Please sign in to like the idea", "warning");
      return;
    }

    try {
      const clikedIdea = ideas.find(idea => idea.id === ideaID);
      const clikedIdeaIndex = ideas.findIndex(idea => idea.id === ideaID);
      const likedIdea = {
        ...clikedIdea,
        gazers: Number(clikedIdea.gazers) + 1
      };
      const updatedIdeas = [
        ...ideas.slice(0, clikedIdeaIndex),
        likedIdea,
        ...ideas.slice(clikedIdeaIndex + 1)
      ];

      await this.setState({ ideas: updatedIdeas });

      const url = `${process.env.REACT_APP_BASE_URL}/idea/gaze/${ideaID}`;

      const request = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        })
      });
      const response = await request.json();

      if (response.status === 200) {
        this.getLikedIdeas();
      } else {
        // eslint-disable-next-line
        throw new String("todo, error not handled");
      }
    } catch (err) {
      console.error(err);
      this.props.showNotification("Error while liking the idea", "warning");
      this.setState({ ideas: ideasBeforeLiking });
    }
  };

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
            likeClicked={this.likeClicked}
            userLikedIdeas={this.state.userLikedIdeas}
            isUserLoggedIn={
              localStorage.getItem("accessToken") === null ? false : true
            }
          />
        </section>
        <aside>
          <Fab openAddNewModal={this.toggleAddNewModal} />
        </aside>
        <AddIdea
          showModal={this.state.isAddNewModalOpen}
          toggleAddNewModal={this.toggleAddNewModal}
          submitIdeaToServer={this.submitIdeaToServerClicked}
          showNotification={this.props.showNotification}
          textOfNotification={this.props.textOfNotification}
        />
      </>
    );
  }
}
