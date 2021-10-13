import AppReducer from "./AppReducer";

describe("PREV_PAGE action", () => {
  test("jumps to a previous page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "PREV_PAGE" }
    );
    expect(state.active).toEqual(2);
    expect(state.selected).toEqual(new Set([2]));
  });

  test("stands at first page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 0,
        selected: new Set([0]),
      },
      { type: "PREV_PAGE" }
    );
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));
  });
});

describe("NEXT_PAGE action", () => {
  test("jumps to a next page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "NEXT_PAGE" }
    );
    expect(state.active).toEqual(4);
    expect(state.selected).toEqual(new Set([4]));
  });

  test("stands at last page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 6,
        selected: new Set([6]),
      },
      { type: "NEXT_PAGE" }
    );
    expect(state.active).toEqual(6);
    expect(state.selected).toEqual(new Set([6]));
  });
});

describe("FIRST_PAGE action", () => {
  test("jumps to a first page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "FIRST_PAGE" }
    );
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));
  });
});

describe("LAST_PAGE action", () => {
  test("jumps to a first page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "LAST_PAGE" }
    );
    expect(state.active).toEqual(6);
    expect(state.selected).toEqual(new Set([6]));
  });
});

describe("JUMP_TO_PAGE action", () => {
  test("jumps to a specified page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "JUMP_TO_PAGE", index: 5 }
    );
    expect(state.active).toEqual(5);
    expect(state.selected).toEqual(new Set([5]));
  });

  test("jumps to a specified page with pages", () => {
    let state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "JUMP_TO_PAGE", index: -1 }
    );
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));

    state = AppReducer(
      {
        pages: "abcdefg".split(""),
        active: 3,
        selected: new Set([3]),
      },
      { type: "JUMP_TO_PAGE", index: 100 }
    );
    expect(state.active).toEqual(6);
    expect(state.selected).toEqual(new Set([6]));
  });
});
