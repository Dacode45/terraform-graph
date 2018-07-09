import { Directive, ElementRef, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  @Input('dragProxy') dragProxy?: HTMLElement;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    const el = d3.select(this.dragProxy || this.el.nativeElement);

    el.call(d3.drag()
      .on('drag', dragged)
    );
  }
}

function dragstarted(d) {}

function dragged(d) {
  d3.select(this).attr('transform', `translate(${d3.event.x}, ${d3.event.y})`);
}

function dragended(d) {}
