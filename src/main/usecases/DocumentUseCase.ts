import Page from "../Page";
import PageRepository from "../repositories/PageRepository";
import DocumentRepository from "../repositories/DocumentRepository";
import DocumentNotifier from "../notifiers/DocumentNotifier";
import { v4 as uuidv4 } from "uuid";

export default class PageListUseCase {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly documentRepository: DocumentRepository,
    private readonly documentNotifier: DocumentNotifier
  ) {}

  append(src: string, contentType: string): string {
    const pageId = uuidv4();
    this.pageRepository.save(pageId, { src, contentType });
    this.documentRepository.append(pageId);
    const newPageIds = this.documentRepository.getIds();
    this.documentNotifier.notifyPageUpdated(newPageIds);

    return pageId;
  }

  remove(pageIds: string[]) {
    this.documentRepository.remove(pageIds);
    const newPageIds = this.documentRepository.getIds();
    this.documentNotifier.notifyPageUpdated(newPageIds);
  }

  movePage(pageId: string, insertBefore: number) {
    this.documentRepository.movePage(pageId, insertBefore);
    const newPageIds = this.documentRepository.getIds();
    this.documentNotifier.notifyPageUpdated(newPageIds);
  }

  getContent(pageId: string): Page | undefined {
    return this.pageRepository.load(pageId);
  }
}
