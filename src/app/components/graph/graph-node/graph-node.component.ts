import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { Node, SocketMap, SocketIterator, SocketWithName } from '../../../models/graph/node.model';

interface Margin {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface NodeDimensions {
  headerHeight: number;

  margin: Margin;
  width: number;
  height: number;
}

const defaultNodeDimensions: NodeDimensions = {
  headerHeight: 10,
  margin: {
    top: 15,
    left: 0,
    bottom: 0,
    right: 0
  },
  width: 200,
  height: 300,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-graph-node]',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.scss']
})
export class GraphNodeComponent implements OnInit {
  // @ViewChild('container') elContainer: ElementRef;
  @Input('node') node: Node;

  inputs: SocketWithName[];
  outputs: SocketWithName[];

  dimensions: NodeDimensions = defaultNodeDimensions;
  inputY = d3.scaleLinear().range([this.dimensions.margin.top, this.dimensions.height]);
  outputY = d3.scaleLinear().range([this.dimensions.margin.top, this.dimensions.height]);

  constructor() { }

  ngOnInit() {
    this.inputs = Array.from(this.node.inputs.entries());
    this.outputs = Array.from(this.node.outputs.entries());

    this.inputY.domain([0, this.inputs.length]);
    this.outputY.domain([0, this.outputs.length]);
    console.log('this', this);
  }

  getSocketTransform(index: number, output?: boolean): string {
    const x = (output) ? this.dimensions.width : 0;
    const y = this.dimensions.headerHeight + this.inputY(index);
    return `translate(${x} ${y})`;
  }

}
