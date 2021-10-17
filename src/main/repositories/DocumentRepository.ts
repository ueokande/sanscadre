export default interface DocumentRepository {
  append(pageId: string): void;

  remove(pageIds: string[]): void;

  getIds(): string[];

  movePage(pageId: string, insertBefore: number): void;
}

export class DocumentRepositoryImpl implements DocumentRepository {
  private pages: Array<string> = [];

  append(pageId: string) {
    this.pages = this.pages.concat(pageId);
  }

  remove(pageIds: string[]): void {
    let newPages = this.pages.slice(0);
    for (const pageId of pageIds) {
      const index = this.pages.indexOf(pageId);
      if (index < 0) {
        throw new Error(`page not found: ${pageId}`);
      }
      newPages = newPages.slice(0, index).concat(this.pages.slice(index + 1));
    }
    this.pages = newPages;
  }

  getIds(): string[] {
    return this.pages;
  }

  movePage(pageId: string, insertBefore: number) {
    const index = this.pages.indexOf(pageId);
    if (index < 0) {
      throw new Error(`page not found: ${pageId}`);
    }
    const p = this.pages[index];

    const a = this.pages;
    if (index < insertBefore) {
      this.pages = this.pages
        .slice(0, index)
        .concat(a.slice(index + 1, insertBefore), p, a.slice(insertBefore));
    } else {
      this.pages = this.pages
        .slice(0, insertBefore)
        .concat(p, a.slice(insertBefore, index), a.slice(index + 1));
    }
  }
}
