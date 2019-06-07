import React from "react";

export default ({ loadingText = "" }) => (
  <div className="text-center">
    <div className="lds-facebook">
      <div />
      <div />
    </div>
    <p className="margin-top-none">{loadingText}</p>
  </div>
);
