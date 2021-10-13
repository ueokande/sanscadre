import React from "react";

export type Action =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "FIRST_PAGE" }
  | { type: "LAST_PAGE" }
  | { type: "JUMP_TO_PAGE"; index: number }
  | { type: "SET_PAGES"; pageIds: string[] }
  | { type: "TOGGLE_SELECTED"; index: number }
  | { type: "SELECT_RANGE"; end: number }
  | { type: "SELECT_ALL" };

export interface State {
  active: number;
  pages: Array<string>;
  selected: Set<number>;
}

const AppReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "PREV_PAGE":
      return {
        ...state,
        active: Math.max(state.active - 1, 0),
        selected: new Set([Math.max(state.active - 1, 0)]),
      };
    case "NEXT_PAGE":
      return {
        ...state,
        active: Math.min(state.active + 1, state.pages.length - 1),
        selected: new Set([Math.min(state.active + 1, state.pages.length - 1)]),
      };
    case "FIRST_PAGE":
      return {
        ...state,
        active: 0,
        selected: new Set([0]),
      };
    case "LAST_PAGE":
      return {
        ...state,
        active: state.pages.length - 1,
        selected: new Set([state.pages.length - 1]),
      };
    case "JUMP_TO_PAGE":
      return {
        ...state,
        active: Math.max(Math.min(action.index, state.pages.length - 1), 0),
        selected: new Set([
          Math.max(Math.min(action.index, state.pages.length - 1), 0),
        ]),
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
          Array.from(Array(Math.abs(state.active - action.end) + 1).keys()).map(
            (x) => x + Math.min(state.active, action.end)
          )
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
