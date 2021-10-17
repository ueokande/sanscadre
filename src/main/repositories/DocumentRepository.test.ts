import { DocumentRepositoryImpl } from "./DocumentRepository";

describe("DocumentRepositoryImpl", () => {
  it("appends and removes pages", () => {
    const sut = new DocumentRepositoryImpl();

    expect(sut.getIds()).toHaveLength(0);

    sut.append("page1");
    sut.append("page2");
    sut.append("page3");
    expect(sut.getIds()).toEqual(["page1", "page2", "page3"]);

    sut.remove(["page2"]);
    expect(sut.getIds()).toEqual(["page1", "page3"]);

    expect(() => sut.remove(["pageX"])).toThrowError("page not found: pageX");
  });

  describe("#movePage", () => {
    let sut: DocumentRepositoryImpl;

    beforeEach(() => {
      sut = new DocumentRepositoryImpl();
      "abcdefg".split("").forEach((c) => {
        sut.append(c);
      });
    });

    it("moves a pages backward", () => {
      sut.movePage("c", 1);
      expect(sut.getIds()).toEqual("acbdefg".split(""));
    });

    it("moves a pages into first", () => {
      sut.movePage("c", 0);
      expect(sut.getIds()).toEqual("cabdefg".split(""));
    });

    it("moves a pages forward", () => {
      sut.movePage("c", 4);
      expect(sut.getIds()).toEqual("abdcefg".split(""));
    });

    it("moves a pages into last", () => {
      sut.movePage("c", 7);
      expect(sut.getIds()).toEqual("abdefgc".split(""));
    });

    it("moves a page to the same position", () => {
      sut.movePage("d", 3);
      expect(sut.getIds()).toEqual("abcdefg".split(""));

      sut.movePage("d", 4);
      expect(sut.getIds()).toEqual("abcdefg".split(""));
    });
  });
});
