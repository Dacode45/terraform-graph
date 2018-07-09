import { State, Action, StateContext, Actions, ofActionDispatched } from '@ngxs/store';
import { AddNodeError, DeleteNodeError, AddNode } from './nodes.actions';

export interface DebugStateModel {
  logLevel: number;
  errors: Error[];
}

export const defaultDebugStateModel: DebugStateModel = {
  logLevel: 0,
  errors: []
};

@State<DebugStateModel>({
  name: 'debug',
  defaults: defaultDebugStateModel,
})
export class DebugState {
  @Action([AddNodeError, DeleteNodeError])
  HandleError(context: StateContext<DebugStateModel>, action: { payload: any }) {
    if (context.getState().logLevel) {
      console.error(action.payload);
    }
    context.patchState({
      errors: [...context.getState().errors, action.payload],
    });
  }
}
