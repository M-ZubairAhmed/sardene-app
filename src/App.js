import React from "react";

import Nav from "./nav";
import Search from "./search";
import List from "./list";

export default () => (
  <>
    <header>
      <Nav />
    </header>
    <section>
      <Search />
    </section>
    <main>
      <List />
    </main>
  </>
);
