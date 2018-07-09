import { Store, NgxsModule } from '@ngxs/store';
import { TestBed, async } from '@angular/core/testing';
import { NodesState, NodesStateModel, defaultNodeStateModel } from './nodes.state';
import { AddNode, DeleteNode } from './nodes.actions';
import { Node } from '../../models/graph/node.model';
import { DebugState, DebugStateModel, defaultDebugStateModel } from './debug.state';

describe('Nodes State', () => {
  let store: Store;
​
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        NodesState,
        DebugState,
      ])],
    }).compileComponents();

    store = TestBed.get(Store);
    store.reset({
      nodes: defaultNodeStateModel,
      debug: defaultDebugStateModel,
    });
  }));
​
  it('it adds node', () => {
    const testNode = new Node('test', new Map(), new Map(), () => {});
    const cloneNode = new Node('test', new Map(), new Map(), () => {});

    // Can add a single node
    store.dispatch(new AddNode(testNode));
    store.selectOnce<NodesStateModel>(state => state.nodes).subscribe(state => {
      const nodes = state.nodes;
      const names = nodes.map(n => n.name);
      expect(names).toContain(testNode.name);
    });

    // Refuses to add a duplicate node
    // ensures that error called
    store.dispatch(new AddNode(cloneNode));
    store.selectOnce<NodesStateModel>(state => state.nodes).subscribe(state => {
      expect(state.nodes.length).toBe(1);
    });
    store.selectOnce<DebugStateModel>(state => state.debug).subscribe(state => {
      expect(state.errors.length).toBe(1);
    });
  });

  it('it deletes a node', () => {
    const testNode = new Node('test', new Map(), new Map(), () => {});
    const cloneNode = new Node('test', new Map(), new Map(), () => {});



    // can't delete a non existent node
    store.dispatch(new DeleteNode(testNode));
    store.selectOnce<DebugStateModel>(state => state.debug).subscribe(state => {
      expect(state.errors.length).toBe(1);
    });

    // Can delete a node
    store.dispatch(new AddNode(testNode));
    store.dispatch(new DeleteNode(testNode));
    store.selectOnce<NodesStateModel>(state => state.nodes).subscribe(state => {
      console.log('state', state);
      expect(state.nodes.length).toBe(0);
    });
  });
});
