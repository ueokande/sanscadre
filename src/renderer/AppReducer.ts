import React from "react";

export type Action = { type: "NEXT_PAGE" } | { type: "PREV_PAGE" };

export interface State {
  index: number;
  pages: Array<string>;
}

const AppReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "PREV_PAGE":
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
      };
    case "NEXT_PAGE":
      return {
        ...state,
        index: Math.min(state.index + 1, state.pages.length - 1),
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default AppReducer;
