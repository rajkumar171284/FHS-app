import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyPieComponent } from './plotly-pie.component';

describe('PlotlyPieComponent', () => {
  let component: PlotlyPieComponent;
  let fixture: ComponentFixture<PlotlyPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotlyPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
