import { Node } from '../../models/graph/node.model';

export class AddNode {
  static readonly type = '[Nodes] AddNode';
  constructor(public payload: Node) {}
}

export class AddNodeSuccess {
  static readonly type = '[Nodes] AddNodeSuccess';
  constructor(public payload: Node) {}
}

export class AddNodeError {
  static readonly type = '[Nodes] AddNodeError';
  constructor(public payload: Error) {}
}

export class DeleteNode {
  static readonly type = '[Nodes] DeleteNode';
  constructor(public payload: Node) {}
}

export class DeleteNodeSuccess {
  static readonly type = '[Nodes] DeleteNodeSuccess';
  constructor(public payload: Node) {}
}

export class DeleteNodeError {
  static readonly type = '[Nodes] DeleteNodeError';
  constructor(public payload: Error) {}
}
