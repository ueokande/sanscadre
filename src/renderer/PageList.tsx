import React from "react";
import AppContext from "./AppContext";

const PageList: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return (
    <ul>
      {state.pages.map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  );
};

export default PageList;
