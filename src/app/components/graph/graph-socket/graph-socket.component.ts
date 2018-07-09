import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/graph/node.model';
import { Socket } from '../../../models/graph/socket.model';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-graph-socket]',
  templateUrl: './graph-socket.component.html',
  styleUrls: ['./graph-socket.component.scss']
})
export class GraphSocketComponent implements OnInit {
  @Input('node') node: Node;
  @Input('name') name: string;
  @Input('socket') socket: Socket;
  @Input('isOutput') isOutput: boolean;

  value$: Observable<{}>;

  constructor() { }

  ngOnInit() {
    this.value$ = this.socket.asObservable();
  }

}
