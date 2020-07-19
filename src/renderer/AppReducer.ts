import React from "react";

export type Action =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "FIRST_PAGE" }
  | { type: "LAST_PAGE" }
  | { type: "JUMP_TO_PAGE"; index: number }
  | { type: "APPEND_PAGE"; path: string }
  | { type: "MOVE_PAGE"; targetIndex: number; insertBefore: number };

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
    case "FIRST_PAGE":
      return {
        ...state,
        index: 0,
      };
    case "LAST_PAGE":
      return {
        ...state,
        index: state.pages.length - 1,
      };
    case "JUMP_TO_PAGE":
      return {
        ...state,
        index: Math.max(Math.min(action.index, state.pages.length - 1), 0),
      };
    case "APPEND_PAGE":
      return {
        ...state,
        pages: state.pages.concat([action.path]),
      };
    case "MOVE_PAGE":
      return {
        ...state,
        pages: (() => {
          const a = state.pages;
          if (action.targetIndex < action.insertBefore) {
            return a
              .slice(0, action.targetIndex)
              .concat(
                a.slice(action.targetIndex + 1, action.insertBefore),
                a[action.targetIndex],
                a.slice(action.insertBefore)
              );
          } else {
            return a
              .slice(0, action.insertBefore)
              .concat(
                a[action.targetIndex],
                a.slice(action.insertBefore, action.targetIndex),
                a.slice(action.targetIndex + 1)
              );
          }
          return a;
        })(),
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default AppReducer;
