import { Socket } from './socket.model';
import { Subscription } from 'rxjs';

export class Connection {
  sub: Subscription;
  constructor(public input: Socket, public output: Socket) {
    this.sub = this.input.asObservable().subscribe(value => this.output.next(value));
  }

  destroy() {
    this.sub.unsubscribe();
  }
}
