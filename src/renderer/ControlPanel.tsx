import React from "react";
import AppContext from "./AppContext";

const ControlPanel: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const prevPage = () => dispatch({ type: "PREV_PAGE" });
  const nextPage = () => dispatch({ type: "NEXT_PAGE" });

  return (
    <div>
      <button onClick={prevPage}>&lt;</button>
      {state.index + 1}
      <button onClick={nextPage}>&gt;</button>
    </div>
  );
};

export default ControlPanel;
