import CursorRepository from "../repositories/CursorRepository";
import DocumentRepository from "../repositories/DocumentRepository";
import CursorNotifier from "../notifiers/CursorNotifier";

export default class CursorUseCase {
  constructor(
    private readonly cursorRepository: CursorRepository,
    private readonly documentRepository: DocumentRepository,
    private readonly cursorNotifier: CursorNotifier
  ) {}

  goNext(): number {
    const total = this.documentRepository.getIds().length;
    if (total == 0) {
      throw new Error("document not opened yet");
    }
    const current = this.cursorRepository.get();
    const newIndex = Math.min(current + 1, total - 1);
    this.cursorRepository.set(newIndex);
    this.cursorNotifier.notifyCursorChanged(newIndex);
    return newIndex;
  }

  goPrev(): number {
    const total = this.documentRepository.getIds().length;
    if (total == 0) {
      throw new Error("document not opened yet");
    }
    const current = this.cursorRepository.get();
    const newIndex = Math.max(current - 1, 0);
    this.cursorRepository.set(newIndex);
    this.cursorNotifier.notifyCursorChanged(newIndex);
    return newIndex;
  }

  goFirst(): number {
    this.cursorRepository.set(0);
    this.cursorNotifier.notifyCursorChanged(0);
    return 0;
  }

  goLast(): number {
    const total = this.documentRepository.getIds().length;
    const newIndex = total - 1;
    this.cursorRepository.set(newIndex);
    this.cursorNotifier.notifyCursorChanged(newIndex);
    return newIndex;
  }

  goAt(index: number): number {
    this.cursorRepository.set(index);
    this.cursorNotifier.notifyCursorChanged(index);
    return index;
  }

  hasNextPage(): boolean {
    const total = this.documentRepository.getIds().length;
    const current = this.cursorRepository.get();
    return current < total - 1;
  }

  hasPrevPage(): boolean {
    const current = this.cursorRepository.get();
    return 0 < current;
  }
}
