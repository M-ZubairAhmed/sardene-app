import React from "react";

export default ({ openAddNewModal }) => (
  <div className="fab">
    <button
      className="paper-btn margin"
      popover-top="Submit a new idea"
      onClick={() => openAddNewModal()}
    >
      &#43;
    </button>
  </div>
);
