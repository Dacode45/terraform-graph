import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGridComponent } from './graph-grid.component';

describe('GraphGridComponent', () => {
  let component: GraphGridComponent;
  let fixture: ComponentFixture<GraphGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
