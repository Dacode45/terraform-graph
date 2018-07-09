import { Observable, merge } from 'rxjs';
import { Socket } from './socket.model';
import { map } from 'rxjs/operators';
import { Connection } from './connection.model';

interface NodeContext {
  node: Node;
}

export type NodeTransformation = (state: SocketIngressState) => void;
export type SocketMap = Map<string, Socket>;
export type SocketWithName<T = {}> = [string, Socket<T>];
export type SocketIterator<T = {}> = IterableIterator<SocketWithName<T>>;

export type ConnectionMap = Map<string, Map<string, Connection>>;

interface SocketIngressState {
  value: any;
  key: string;
  socket: Socket;
  context: NodeContext;
}

export class Node {
  private sub;
  public inputConnections: ConnectionMap = new Map();
  public outputConnections: ConnectionMap = new Map();

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

  connect(output: string, node: Node, input: string) {
    const outSocket = this.outputs.get(output);
    if (!outSocket) throw new Error('output socket does not exist');

    const inSocket = node.inputs.get(input);
    if (!inSocket) throw new Error('input socket does not exist');

    const qualifiedInput = node.getSocketName(input);
    const qualifiedOutput = this.getSocketName(output);

    const outputConnections = this.outputConnections.get(output) || new Map();
    if (outputConnections.get(qualifiedInput)) throw new Error('Cannot have two outputConnections mapping the same output and input');

    const inputConnections = node.inputConnections.get(input) || new Map();
    if (inputConnections.get(qualifiedOutput)) throw new Error('Cannot have two outputConnections mapping the same output and input');

    const connection = new Connection(outSocket, inSocket);

    // update input state
    outputConnections.set(qualifiedInput, connection);
    this.outputConnections.set(output, outputConnections);

    // update output state
    inputConnections.set(qualifiedOutput, connection);
    this.inputConnections.set(input, inputConnections);

    return connection;
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

  getSocketName(socket: string): string {
    return `${this.name}_${socket}`;
  }
}
