import React from "react";

export default props => {
  return (
    <div>
      Sardene
      {props.auth ? (
        <button aria-haspopup="true">Hi, Zubair</button>
      ) : (
        <button aria-haspopup="true" />
      )}
    </div>
  );
};
