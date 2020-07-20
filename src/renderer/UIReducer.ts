import React from "react";

export type Action =
  | { type: "SHOW_SIDEBAR"; width?: number }
  | { type: "HIDE_SIDEBAR" }
  | { type: "SET_SIDEBAR_WIDTH"; width: number };

export interface State {
  showSidebar: boolean;
  sidebarWidth: number;
}

const UIReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SHOW_SIDEBAR":
      return {
        ...state,
        sidebarWidth: action.width ?? state.sidebarWidth,
        showSidebar: true,
      };
    case "HIDE_SIDEBAR":
      return {
        ...state,
        showSidebar: false,
      };
    case "SET_SIDEBAR_WIDTH":
      return {
        ...state,
        sidebarWidth: action.width,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default UIReducer;
