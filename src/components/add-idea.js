import React from "react";

export default class AddNewIdea extends React.Component {
  state = {
    title: "",
    description: ""
  };

  onChange(event) {
    if (event) {
      const {
        target: { name, value }
      } = event;
      this.setState({
        [name]: value
      });
      if (this.props.textOfNotification !== "") {
        this.props.showNotification("", "");
      }
    }
  }

  closeModal(e) {
    e.preventDefault();
    if (this.state.title !== "" || this.state.description !== "") {
      this.props.showNotification(
        "Your idea is stored temporarily, you can access it by cliking add new button again, if you like to resume writing.",
        "secondary"
      );
    }
    this.props.toggleAddNewModal();
  }

  submitIdea = e => {
    e.preventDefault();
    if (this.state.title.trim() === "") {
      this.props.showNotification("Please enter idea name", "danger");
    } else if (this.state.description.trim() === "") {
      this.props.showNotification("Please enter idea description", "danger");
    } else if (localStorage.getItem("accessToken") === null) {
      this.props.showNotification(
        "You are not logged in, please sign in to add idea",
        "danger"
      );
    } else {
      this.props.submitIdeaToServer({
        name: this.state.title,
        description: this.state.description
      });
    }
  };

  render() {
    const { showModal } = this.props;
    const toggleModalClass = showModal ? `modal showModal` : `modal`;

    return (
      <div className={toggleModalClass}>
        <div className="modal-body">
          <h4 className="modal-title">Submit a new Idea</h4>
          <form className="margin-top-large" onSubmit={e => this.submitIdea(e)}>
            <div className="form-group">
              <label htmlFor="title">Enter idea title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Fancy idea name"
                required
                autoFocus
                value={this.state.title}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Enter description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Aggh! we all hate writing long descriptions, but describing the idea a little makes it easier to implement."
                cols="50"
                value={this.state.description}
                onChange={e => this.onChange(e)}
              />
            </div>
            <p className="modal-text">
              Wise words : No idea is bad, they all are just different
            </p>
            <div className="margin-top-large">
              <button
                type="submit"
                className="margin-right-small"
                onClick={this.submitIdea}
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn-danger"
                onClick={e => this.closeModal(e)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
