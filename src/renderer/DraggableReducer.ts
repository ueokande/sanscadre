import React from "react";

export type Action =
  | { type: "DRAG_START"; index: number }
  | { type: "DRAG_OVER"; insertBefore: number }
  | { type: "DRAG_END" };

export interface State {
  dragging: boolean;
  draggingIndex: number;
  insertBefore: number;
}

export const initialState: State = {
  dragging: false,
  draggingIndex: 0,
  insertBefore: 0,
};

const DraggableReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "DRAG_START":
      return {
        ...state,
        dragging: true,
        draggingIndex: action.index,
        insertBefore: action.index,
      };
    case "DRAG_OVER":
      return {
        ...state,
        insertBefore: action.insertBefore,
      };
    case "DRAG_END":
      return {
        ...state,
        dragging: false,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default DraggableReducer;
