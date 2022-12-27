import React, { useState } from "react";
import "./App.scss";

import { context } from "./Contexts/state";

import AddColorForm from "./components/AddColorForm/AddColorForm";
import FilterForm from "./components/FilterForm/FilterForm";

const App = () => {
  const [state, setState] = useState<boolean>(false);

  return (
    <>
      <context.Provider value={state}>
        <AddColorForm state={state} setContextStateValue={setState} />
        <FilterForm />
      </context.Provider>
    </>
  );
};

export default App;
