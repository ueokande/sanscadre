import CursorUseCase from "./CursorUseCase";
import CursorRepository from "../repositories/CursorRepository";
import DocumentRepository from "../repositories/DocumentRepository";
import CursorNotifier from "../notifiers/CursorNotifier";

class MockCursorRepository implements CursorRepository {
  get(): number {
    throw new Error("not implemented");
  }

  set(newValue: number): void {
    throw new Error("not implemented");
  }
}

class MockDocumentRepository implements DocumentRepository {
  append(pageId: string): void {
    throw new Error("not implemented");
  }

  remove(pageIds: string[]): void {
    throw new Error("not implemented");
  }

  getIds(): string[] {
    throw new Error("not implemented");
  }

  movePage(pageId: string, insertBefore: number): void {
    throw new Error("not implemented");
  }
}

class MockCursorNotifier implements CursorNotifier {
  notifyCursorChanged(page: number): Promise<void> {
    throw new Error("not implemented");
  }
}

describe("CursorUseCase", () => {
  const cursorRepository = new MockCursorRepository();
  const documentRepository = new MockDocumentRepository();
  const cursorNotifier = new MockCursorNotifier();

  const cursorRepositorySpy = jest.spyOn(cursorRepository, "set");
  const cursorNotifierSpy = jest.spyOn(cursorNotifier, "notifyCursorChanged");

  const sut = new CursorUseCase(
    cursorRepository,
    documentRepository,
    cursorNotifier
  );

  beforeEach(() => {
    jest
      .spyOn(documentRepository, "getIds")
      .mockReturnValue("abcdefgh".split(""));
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(cursorRepository, "set").mockImplementation(() => {});
    jest
      .spyOn(cursorNotifier, "notifyCursorChanged")
      .mockReturnValue(Promise.resolve());

    cursorRepositorySpy.mockClear();
    cursorNotifierSpy.mockClear();
  });

  describe("#goNext", () => {
    it("jumps to a previous page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(3);

      const returned = sut.goNext();
      expect(returned).toEqual(4);
      expect(cursorRepositorySpy).toBeCalledWith(4);
      expect(cursorNotifierSpy).toBeCalledWith(4);
    });

    it("stands at first page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(7);

      const returned = sut.goNext();
      expect(returned).toEqual(7);
      expect(cursorRepositorySpy).toBeCalledWith(7);
      expect(cursorNotifierSpy).toBeCalledWith(7);
    });
  });

  describe("#goPrev", () => {
    it("jumps to a next page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(3);

      const returned = sut.goPrev();
      expect(returned).toEqual(2);
      expect(cursorRepositorySpy).toBeCalledWith(2);
      expect(cursorNotifierSpy).toBeCalledWith(2);
    });

    it("stands at first page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(0);

      const returned = sut.goPrev();
      expect(returned).toEqual(0);
      expect(cursorRepositorySpy).toBeCalledWith(0);
      expect(cursorNotifierSpy).toBeCalledWith(0);
    });
  });

  describe("#goFirst", () => {
    test("jumps to a first page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(3);

      const returned = sut.goFirst();
      expect(returned).toEqual(0);
      expect(cursorRepositorySpy).toBeCalledWith(0);
      expect(cursorNotifierSpy).toBeCalledWith(0);
    });
  });
  describe("#goLast", () => {
    test("jumps to a last page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(3);

      const returned = sut.goLast();
      expect(returned).toEqual(7);
      expect(cursorRepositorySpy).toBeCalledWith(7);
      expect(cursorNotifierSpy).toBeCalledWith(7);
    });
  });
  describe("#goAt", () => {
    test("jumps to a specified page", () => {
      jest.spyOn(cursorRepository, "get").mockReturnValue(3);

      const returned = sut.goAt(5);
      expect(returned).toEqual(5);
      expect(cursorRepositorySpy).toBeCalledWith(5);
      expect(cursorNotifierSpy).toBeCalledWith(5);
    });
  });
});
