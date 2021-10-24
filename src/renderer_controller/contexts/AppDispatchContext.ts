import React from "react";

const AppDispatchContext = React.createContext<{
  setActive?: (active: number) => void;
  setPageIds?: (pageIds: string[]) => void;
}>({});

export default AppDispatchContext;
