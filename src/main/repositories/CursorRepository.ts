export default interface CursorRepository {
  get(): number;

  set(newValue: number): void;
}

export class CursorRepositoryImpl implements CursorRepository {
  private current = 0;

  get(): number {
    return this.current;
  }

  set(newValue: number): void {
    this.current = newValue;
  }
}
