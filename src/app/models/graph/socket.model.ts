import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class Socket<T = {}> {

  subject: BehaviorSubject<T>;

  constructor(current: T) {
    this.subject = new BehaviorSubject(current);
  }

  asObservable() {
    return this.subject.asObservable().pipe(
      filter(v => v !== undefined && v !== null)
    );
  }

  next(value: T): void {
    return this.subject.next(value);
  }

  getValue(): T {
    return this.subject.getValue();
  }
}
