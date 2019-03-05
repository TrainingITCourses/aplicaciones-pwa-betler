import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCounterComponent } from './result-counter.component';

describe('ResultCounterComponent', () => {
  let component: ResultCounterComponent;
  let fixture: ComponentFixture<ResultCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
