import Page from "../Page";

export default interface PageRepository {
  save(id: string, page: Page): void;

  load(id: string): Page | undefined;
}

export class PageRepositoryImpl implements PageRepository {
  private readonly pages: Map<string, Page> = new Map();

  save(id: string, page: Page): void {
    this.pages.set(id, page);
  }

  load(id: string): Page | undefined {
    return this.pages.get(id);
  }
}
