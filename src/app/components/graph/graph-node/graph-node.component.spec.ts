import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeComponent } from './graph-node.component';
import { DraggableDirective } from '../../../directives/graph/draggable.directive';

describe('GraphNodeComponent', () => {
  let component: GraphNodeComponent;
  let fixture: ComponentFixture<GraphNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GraphNodeComponent,
        DraggableDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
