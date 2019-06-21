import React from "react";

import Loader from "../components/loader";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
const ENUM_EMPTY = "EMPTY_IDEAS";
const ENUM_ERROR = "ERROR";

const shouldDisableLiking = (isUserLoggedIn, didUserLikedThisIdea) => {
  if (isUserLoggedIn) {
    if (didUserLikedThisIdea) {
      return true;
    }
    return false;
  }
  return true;
};

const getPersonalizedLikingText = (didUserLikedThisIdea = false, likeCount) => {
  const adjective = "like";
  const comparative = "liked";
  const superlative = "loved";

  if (isNaN(likeCount)) {
    return "";
  } else {
    if (didUserLikedThisIdea) {
      if (likeCount === 1) {
        return `You ${comparative} it`;
      } else {
        const othersCount = likeCount - 1;
        if (othersCount === 1) {
          return `You and another person ${comparative} it`;
        } else {
          return `You and ${othersCount} others ${superlative} it`;
        }
      }
    } else {
      if (likeCount === 1) {
        return `1 person ${adjective} it`;
      } else if (likeCount > 1) {
        return `${likeCount} people ${superlative} it`;
      } else {
        return `People are yet to ${adjective} it`;
      }
    }
  }
};

const IdeaCards = ({
  ideas = [],
  likeClicked,
  userLikedIdeas = [],
  isUserLoggedIn = false
}) => {
  return (
    <div className="row flex-center">
      {ideas.map(idea => {
        const didUserLikedThisIdea =
          userLikedIdeas.filter(
            userLikedIdea => userLikedIdea.ideaID === idea.id
          ).length !== 0;
        const personalizedLikingText = getPersonalizedLikingText(
          didUserLikedThisIdea,
          parseInt(idea.gazers, 10),
          "like"
        );
        const disableLikingForSomeReason = shouldDisableLiking(
          isUserLoggedIn,
          didUserLikedThisIdea
        );

        return (
          <div className="sm-12 md-8 lg-8 col" key={`${idea.id}`}>
            <div className="card margin-bottom-large">
              <div className="card-body">
                <h4 className="card-title">{idea.name}</h4>
                <p className="card-text">{idea.description}</p>
                <h6 className="card-text">
                  <a
                    href={`https://github.com/${idea.publisher}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                    style={{ backgroundImage: "none" }}
                  >
                    &#64;{idea.publisher}
                  </a>
                </h6>
                <div className="margin" />
                <div className="row flex-edges margin-bottom-none flex-bottom">
                  <div className="col padding-left-none padding-bottom-none">
                    <p className="margin-top-large text-muted">
                      {personalizedLikingText}
                    </p>
                  </div>
                  <div className="col padding-right-none padding-bottom-none">
                    <button
                      className={`text-primary ${
                        disableLikingForSomeReason
                          ? `paper-btn btn-primary`
                          : ""
                      }`}
                      onClick={() => likeClicked(idea.id)}
                      disabled={disableLikingForSomeReason}
                      popover-top={
                        isUserLoggedIn
                          ? didUserLikedThisIdea
                            ? "You already liked this idea"
                            : "Like this idea"
                          : "Please sign in to like the idea"
                      }
                    >
                      {didUserLikedThisIdea ? "♥ Liked" : "♡ Like it"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ({
  ideas,
  networkState,
  likeClicked,
  makeClicked,
  userLikedIdeas,
  isUserLoggedIn
}) => (
  <>
    {networkState === ENUM_LOADING && <Loader loadingText="Loading ideas" />}
    {networkState === ENUM_COMPLETE && (
      <IdeaCards
        ideas={ideas}
        likeClicked={likeClicked}
        makeClicked={makeClicked}
        userLikedIdeas={userLikedIdeas}
        isUserLoggedIn={isUserLoggedIn}
      />
    )}
    {networkState === ENUM_EMPTY && (
      <h2 className="text-center">No ideas yet</h2>
    )}
    {networkState === ENUM_ERROR && (
      <h2 className="text-center">Failed to load ideas!!</h2>
    )}
  </>
);
