import React from "react";
import Search from "../components/search";
import IdeaList from "../components/list";

export default class Home extends React.Component {
  render() {
    return (
      <>
        <aside>
          <Search />
        </aside>
        <section>
          <IdeaList />
        </section>
      </>
    );
  }
}
