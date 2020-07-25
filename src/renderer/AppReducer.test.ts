import AppReducer from "./AppReducer";

describe("PREV_PAGE action", () => {
  test("jumps to a previous page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
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
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "JUMP_TO_PAGE", index: -1 }
    );
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));

    state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "JUMP_TO_PAGE", index: 100 }
    );
    expect(state.active).toEqual(6);
    expect(state.selected).toEqual(new Set([6]));
  });
});

describe("APPEND_PAGE action", () => {
  test("appends a page to the last", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "APPEND_PAGE", src: "z", contentType: "" }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefgz".split(""));
    expect(state.active).toEqual(7);
    expect(state.selected).toEqual(new Set([7]));
  });
});

describe("MOVE_PAGE action", () => {
  test("moves a pages backward", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 2,
        selected: new Set([2]),
      },
      { type: "MOVE_PAGE", insertBefore: 1 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("acbdefg".split(""));
    expect(state.active).toEqual(1);
    expect(state.selected).toEqual(new Set([1]));
  });

  test("moves a pages into first", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 2,
        selected: new Set([2]),
      },
      { type: "MOVE_PAGE", insertBefore: 0 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("cabdefg".split(""));
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));
  });

  test("moves a pages forward", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 2,
        selected: new Set([2]),
      },
      { type: "MOVE_PAGE", insertBefore: 4 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abdcefg".split(""));
    expect(state.active).toEqual(3);
    expect(state.selected).toEqual(new Set([3]));
  });

  test("moves a pages into last", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 2,
        selected: new Set([2]),
      },
      { type: "MOVE_PAGE", insertBefore: 7 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abdefgc".split(""));
    expect(state.active).toEqual(6);
    expect(state.selected).toEqual(new Set([6]));
  });

  test("moves a page to the same position", () => {
    let state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "MOVE_PAGE", insertBefore: 3 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefg".split(""));
    expect(state.active).toEqual(3);
    expect(state.selected).toEqual(new Set([3]));

    state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "MOVE_PAGE", insertBefore: 4 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefg".split(""));
    expect(state.active).toEqual(3);
    expect(state.selected).toEqual(new Set([3]));
  });
});

describe("DELETE_SELECTED action", () => {
  test("delete a page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 3,
        selected: new Set([3]),
      },
      { type: "DELETE_SELECTED" }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcefg".split(""));
    expect(state.active).toEqual(3);
    expect(state.selected).toEqual(new Set([3]));
  });

  test("delete a first page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 0,
        selected: new Set([0]),
      },
      { type: "DELETE_SELECTED" }
    );
    expect(state.pages.map((p) => p.src)).toEqual("bcdefg".split(""));
    expect(state.active).toEqual(0);
    expect(state.selected).toEqual(new Set([0]));
  });

  test("delete a last page", () => {
    const state = AppReducer(
      {
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
        active: 6,
        selected: new Set([6]),
      },
      { type: "DELETE_SELECTED" }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdef".split(""));
    expect(state.active).toEqual(5);
    expect(state.selected).toEqual(new Set([5]));
    expect(state.selected).toEqual(new Set([5]));
  });
});
