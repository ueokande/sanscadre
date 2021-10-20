import React from "react";

type State = {
  active: number;
  pages: Array<string>;
};

const DocumentStateContext = React.createContext<State>({
  active: 0,
  pages: [],
});

export default DocumentStateContext;
