import Rect from "./Rect";

describe("Rect", () => {
  const rect = new Rect({ x: 10, y: 20, width: 160, height: 120 });

  describe("width and width", () => {
    it("returns a width", () => {
      expect(rect.width).toEqual(160);
    });
    it("returns a height", () => {
      expect(rect.height).toEqual(120);
    });
  });

  describe("translated", () => {
    it("returns a translated rect", () => {
      const translated = rect.translated({ dx: 40, dy: 60 });
      expect(translated.left).toEqual(50);
      expect(translated.top).toEqual(80);
      expect(translated.width).toEqual(160);
      expect(translated.height).toEqual(120);
    });
  });
});
