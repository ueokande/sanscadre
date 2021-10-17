import React from "react";

export type Action =
  | { type: "SET_CURSOR"; index: number }
  | { type: "SET_PAGES"; pageIds: string[] }
  | { type: "TOGGLE_SELECTED"; index: number }
  | { type: "SELECT_RANGE"; begin?: number; end: number }
  | { type: "SELECT_ALL" };

export interface State {
  active: number;
  pages: Array<string>;
  selected: Set<number>;
}

const AppReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_CURSOR":
      return {
        ...state,
        active: action.index,
      };
    case "SET_PAGES":
      return {
        ...state,
        pages: action.pageIds,
        active: Math.min(state.active, action.pageIds.length - 1),
        selected: new Set([Math.min(state.active, action.pageIds.length - 1)]),
      };
    case "TOGGLE_SELECTED":
      return {
        ...state,
        selected: (() => {
          if (action.index === state.active) {
            return state.selected;
          }

          const selected = new Set(state.selected);
          if (selected.has(action.index)) {
            selected.delete(action.index);
          } else {
            selected.add(action.index);
          }
          return selected;
        })(),
      };
    case "SELECT_RANGE":
      return {
        ...state,
        selected: new Set(
          Array.from(
            Array(
              Math.abs((action.begin ?? state.active) - action.end) + 1
            ).keys()
          ).map((x) => x + Math.min(action.begin ?? state.active, action.end))
        ),
      };
    case "SELECT_ALL":
      return {
        ...state,
        selected: new Set(Array(state.pages.length).keys()),
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default AppReducer;
