import React from "react";

export default class Search extends React.Component {
  render() {
    return (
      <div className="row flex-center background-muted padding-large">
        <div className="col sm-6">
          <div className="form-group">
            <label htmlFor="paperInputs3">Filter ideas</label>
            <input
              className="input-block"
              type="text"
              id="paperInputs3"
              placeholder="Search with keywords, tags, titles etc."
            />
            <div className="text-center margin">
              <button>Quick search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
