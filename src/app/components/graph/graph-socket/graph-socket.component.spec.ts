import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSocketComponent } from './graph-socket.component';

describe('GraphSocketComponent', () => {
  let component: GraphSocketComponent;
  let fixture: ComponentFixture<GraphSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
