import React from "react";
import axios from "axios";

import Loader from "../components/loader";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
// const ENUM_ERROR = "ERROR";

const IdeaCards = ({ ideas }) => (
  <div className="row flex-center">
    {ideas.map(idea => (
      <div
        className="sm-12 md-8 lg-8 col"
        key={`${idea.name}-${idea.publisher}`}
      >
        <div className="card margin-bottom-large">
          <div className="card-body">
            <h4 className="card-title">{idea.name}</h4>
            <p className="card-text">{idea.description}</p>
            <h6 className="card-text">- {idea.publisher}</h6>
            <div className="margin" />
            <div className="row flex-edges margin-bottom-none">
              <div className="col padding-left-none padding-bottom-none">
                <p className="margin-top-large text-muted">
                  {parseInt(idea.gazers) === 1
                    ? `${parseInt(idea.gazers)} person liked it.`
                    : parseInt(idea.gazers) === 0
                    ? `People are yet to like it.`
                    : `${parseInt(idea.gazers)} people loved it.`}
                </p>
                <p className="text-muted">
                  {parseInt(idea.makers) === 1
                    ? `${parseInt(idea.makers)} person made it.`
                    : parseInt(idea.makers) === 0
                    ? `No one made it yet.`
                    : `${parseInt(idea.makers)} people made it.`}
                </p>
              </div>
              <div className="col padding-bottom-none">
                <button className="margin-right-large">Like it</button>
                <button>I made it</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FloatingActionButton = () => (
  <div className="fab">
    <button className="paper-btn margin">+</button>
  </div>
);

class List extends React.Component {
  state = {
    networkState: ENUM_LOADING,
    ideas: []
  };

  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/ideas`;
      const request = await axios.get(url);
      const response = await request.data;
      if (response.status && response.status === 200) {
        this.setState({
          ideas: response.data.sort((a, b) => b.created_at - a.created_at),
          networkState: ENUM_COMPLETE
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { classes: styles } = this.props;
    const { ideas, networkState } = this.state;

    return (
      <>
        {networkState === ENUM_LOADING && (
          <Loader loadingText="Loading ideas" />
        )}
        {networkState === ENUM_COMPLETE && (
          <IdeaCards ideas={ideas} styles={styles} />
        )}
        <aside>
          <FloatingActionButton styles={styles} />
        </aside>
      </>
    );
  }
}

export default List;
