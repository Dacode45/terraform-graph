import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Node } from './models/graph/node.model';
import { AddNode } from './states/graph/nodes.actions';
import { Socket } from './models/graph/socket.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store) {}

  ngOnInit() {
    const aInputs = new Map();
    const aOutputs = new Map();
    const bInputs = new Map();
    const bOutputs = new Map();
    for ( let i = 0; i < 10; i ++) {
      aInputs.set(`input ${i}`, new Socket(i));
      aOutputs.set(`output ${i}`, new Socket(i));

      bInputs.set(`input ${i}`, new Socket(i));
      bOutputs.set(`output ${i}`, new Socket(i));
    }

    const nodeA = new Node('nodeA', aInputs, aOutputs, ({value, key, context}) => {
      const number = Number(key.match(/\d+/g)[0]);
      const next = context.node.outputs.get(`output ${number}`);
      next.next(value + 1);
    });

    const nodeB = new Node('nodeB', bInputs, bOutputs, ({value, key, context}) => {
      const number = Number(key.match(/\d+/g)[0]);
      const next = context.node.outputs.get(`output ${number}`);
      next.next(value - 1);
    });

    for ( let i = 0; i < 10; i ++) {
      nodeA.connect(`output ${i}`, nodeB, `input ${i}`);
    }


    setInterval(() => {
      const number = getRandomInt(10);
      const input = nodeA.inputs.get(`input ${number}`);
      input.next(getRandomInt(100));
    }, 200);

    this.store.dispatch(new AddNode(nodeA));
    this.store.dispatch(new AddNode(nodeB));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
