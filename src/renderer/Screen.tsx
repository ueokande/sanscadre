import React from "react";
import AppContext from "./AppContext";

const Screen = () => {
  const { state } = React.useContext(AppContext);
  const currentPage = state.pages[state.index];
  if (!currentPage) {
    return null;
  }

  return (
    <div
      style={{
        width: 640,
        height: 480,
        fontSize: "96px",
        textAlign: "center",
        backgroundColor: "#ff00ff",
      }}
    >
      {currentPage}
    </div>
  );
};
export default Screen;
