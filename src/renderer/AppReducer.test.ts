import AppReducer from "./AppReducer";

describe("PREV_PAGE action", () => {
  test("jumps to a previous page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "PREV_PAGE" }
    );
    expect(state.index).toEqual(2);
  });

  test("stands at first page", () => {
    const state = AppReducer(
      {
        index: 0,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "PREV_PAGE" }
    );
    expect(state.index).toEqual(0);
  });
});

describe("NEXT_PAGE action", () => {
  test("jumps to a next page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "NEXT_PAGE" }
    );
    expect(state.index).toEqual(4);
  });

  test("stands at last page", () => {
    const state = AppReducer(
      {
        index: 6,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "NEXT_PAGE" }
    );
    expect(state.index).toEqual(6);
  });
});

describe("FIRST_PAGE action", () => {
  test("jumps to a first page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "FIRST_PAGE" }
    );
    expect(state.index).toEqual(0);
  });
});

describe("LAST_PAGE action", () => {
  test("jumps to a first page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "LAST_PAGE" }
    );
    expect(state.index).toEqual(6);
  });
});

describe("JUMP_TO_PAGE action", () => {
  test("jumps to a specified page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "JUMP_TO_PAGE", index: 5 }
    );
    expect(state.index).toEqual(5);
  });

  test("jumps to a specified page with pages", () => {
    let state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "JUMP_TO_PAGE", index: -1 }
    );
    expect(state.index).toEqual(0);

    state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "JUMP_TO_PAGE", index: 100 }
    );
    expect(state.index).toEqual(6);
  });
});

describe("APPEND_PAGE action", () => {
  test("appends a page to the last", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "APPEND_PAGE", src: "z", contentType: "" }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefgz".split(""));
  });
});

describe("MOVE_PAGE action", () => {
  test("moves a pages backward", () => {
    const state = AppReducer(
      {
        index: 2,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 3, insertBefore: 2 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abdcefg".split(""));
    expect(state.index).toEqual(3);
  });

  test("moves a pages into first", () => {
    const state = AppReducer(
      {
        index: 1,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 2, insertBefore: 0 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("cabdefg".split(""));
    expect(state.index).toEqual(2);
  });

  test("moves a pages forward", () => {
    const state = AppReducer(
      {
        index: 2,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 2, insertBefore: 4 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abdcefg".split(""));
    expect(state.index).toEqual(3);
  });

  test("moves a pages into last", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 2, insertBefore: 7 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abdefgc".split(""));
    expect(state.index).toEqual(2);
  });

  test("moves a page to the same position", () => {
    let state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 3, insertBefore: 3 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefg".split(""));
    expect(state.index).toEqual(3);

    state = AppReducer(
      {
        index: 4,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "MOVE_PAGE", targetIndex: 3, insertBefore: 4 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdefg".split(""));
    expect(state.index).toEqual(4);
  });
});

describe("DELETE_PAGE action", () => {
  test("delete a page", () => {
    const state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "DELETE_PAGE", index: 3 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcefg".split(""));
    expect(state.index).toEqual(3);
  });

  test("delete a first page", () => {
    let state = AppReducer(
      {
        index: 0,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "DELETE_PAGE", index: 0 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("bcdefg".split(""));
    expect(state.index).toEqual(0);

    state = AppReducer(
      {
        index: 3,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "DELETE_PAGE", index: 0 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("bcdefg".split(""));
    expect(state.index).toEqual(2);
  });

  test("delete a last page", () => {
    let state = AppReducer(
      {
        index: 0,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "DELETE_PAGE", index: 6 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdef".split(""));
    expect(state.index).toEqual(0);

    state = AppReducer(
      {
        index: 6,
        pages: "abcdefg".split("").map((c) => ({ src: c, type: "" })),
      },
      { type: "DELETE_PAGE", index: 6 }
    );
    expect(state.pages.map((p) => p.src)).toEqual("abcdef".split(""));
    expect(state.index).toEqual(5);
  });
});
