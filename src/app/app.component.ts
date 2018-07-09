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
    const inputs = new Map();
    const outputs = new Map();
    for ( let i = 0; i < 10; i ++) {
      inputs.set(`input ${i}`, new Socket(i));
      outputs.set(`output ${i}`, new Socket(i));
    }
    const node = new Node('test', inputs, outputs, ({value, key, context}) => {
      const number = Number(key.match(/\d+/g)[0]);
      const next = context.node.outputs.get(`output ${number}`);
      next.next(value + 1);
    });

    setInterval(() => {
      const number = getRandomInt(10);
      const input = node.inputs.get(`input ${number}`);
      input.next(getRandomInt(100));
    }, 200);

    this.store.dispatch(new AddNode(node));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
