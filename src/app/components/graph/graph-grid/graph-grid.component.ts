import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State, Select } from '@ngxs/store';
import { NodesState, NodesStateModel } from '../../../states/graph/nodes.state';

@Component({
  selector: 'app-graph-grid',
  templateUrl: './graph-grid.component.html',
  styleUrls: ['./graph-grid.component.scss']
})
export class GraphGridComponent implements OnInit {

  @Select(NodesState) nodesState$: Observable<NodesStateModel>;
  nodes$ = this.nodesState$.pipe(map(s => s.nodes));

  constructor() { }

  ngOnInit() {
  }

}
