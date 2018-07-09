import { State, Action, StateContext } from '@ngxs/store';
import { Node } from '../../models/graph/node.model';
import { AddNode, AddNodeError, AddNodeSuccess, DeleteNode, DeleteNodeError, DeleteNodeSuccess } from './nodes.actions';

export interface NodesStateModel {
  nodes: Node[];
}

export const defaultNodeStateModel: NodesStateModel = {
  nodes: []
};

@State<NodesStateModel>({
  name: 'nodes',
  defaults: defaultNodeStateModel,
})
export class NodesState {
  @Action(AddNode)
  AddNode(context: StateContext<NodesStateModel>, { payload }: AddNode) {
    const state = context.getState();
    if (state.nodes.find(n => n.name === payload.name)) {
      return context.dispatch(new AddNodeError(new Error('Cannot add node with the same name')));
    } else {
      return context.dispatch(new AddNodeSuccess(payload));
    }
  }

  @Action(AddNodeSuccess)
  AddNodeSuccess(context: StateContext<NodesStateModel>, { payload }: AddNodeSuccess) {
    const state = context.getState();

    context.patchState({
      nodes: [...state.nodes, payload]
    });
  }

  @Action(DeleteNode)
  DeleteNode(context: StateContext<NodesStateModel>, { payload }: DeleteNode) {
    const state = context.getState();
    if (!state.nodes.find(n => n.name === payload.name)) {
      return context.dispatch(new DeleteNodeError(new Error('Cannot delete non-exising node')));
    } else {
      return context.dispatch(new DeleteNodeSuccess(payload));
    }
  }

  @Action(DeleteNodeSuccess)
  DeleteNodeSuccess(context: StateContext<NodesStateModel>, { payload }: DeleteNodeSuccess) {
    const state = context.getState();

    context.patchState({
      nodes: state.nodes.filter(n => n.name !== payload.name)
    });
  }
}
