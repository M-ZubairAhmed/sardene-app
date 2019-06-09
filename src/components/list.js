import React from "react";

import Loader from "../components/loader";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
const ENUM_EMPTY = "EMPTY_IDEAS";
const ENUM_ERROR = "ERROR";

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

export default ({ ideas, networkState }) => (
  <>
    {networkState === ENUM_LOADING && <Loader loadingText="Loading ideas" />}
    {networkState === ENUM_COMPLETE && <IdeaCards ideas={ideas} />}
    {networkState === ENUM_EMPTY && (
      <h2 className="text-center">No ideas yet</h2>
    )}
    {networkState === ENUM_ERROR && (
      <h2 className="text-center">Failed to load ideas!!</h2>
    )}
  </>
);
