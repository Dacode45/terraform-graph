import { Observable, merge } from 'rxjs';
import { Socket } from './socket.model';
import { map } from 'rxjs/operators';

interface NodeContext {
  node: Node;
}

export type NodeTransformation = (state: SocketIngressState) => void;
export type SocketMap = Map<string, Socket>;
export type SocketWithName<T = {}> = [string, Socket<T>];
export type SocketIterator<T = {}> = IterableIterator<SocketWithName<T>>;

interface SocketIngressState {
  value: any;
  key: string;
  socket: Socket;
  context: NodeContext;
}

export class Node {
  private sub;

    constructor(
    public name: string,
    public inputs: SocketMap,
    public outputs: SocketMap,
    public transformation: NodeTransformation
  ) {
    // merge all ingress channels and have them move.
    this.sub = merge(
      ...this.getIngress()
    ).subscribe((state) => {
      this.transformation(state);
    });
  }

  getIngress(): Observable<SocketIngressState>[] {
    // create a stream that listens to all the inputs
    const inStream: Observable<SocketIngressState>[] = [];
    this.inputs.forEach((socket, key) => {
      inStream.push(
        socket.asObservable().pipe(
          map((value) => {
            return {
              value,
              key,
              socket,
              context: { node: this }
            };
          })
        )
      );
    });
    return inStream;
  }
}
