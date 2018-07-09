import { Socket } from './socket.model';
import { Node } from './node.model';

describe('Simple Node', () => {
  it('should create add node', () => {
    const inSocket = new Socket(0);
    const outSocket = new Socket(0);

    const inMap = new Map();
    inMap.set('in', inSocket);

    const outMap = new Map();
    outMap.set('out', outSocket);

    expect(inSocket.getValue()).toBe(0);
    expect(outSocket.getValue()).toBe(0);

    const addNode = new Node('adder', inMap, outMap, (ingress) => {
      const { value, key, context, socket } = ingress;
      context.node.outputs.get('out').next(value + 1);
    });

    expect(outSocket.getValue()).toBe(1);



  });
});
