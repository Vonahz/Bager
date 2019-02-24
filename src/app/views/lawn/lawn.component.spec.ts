import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawnComponent } from './lawn.component';

describe('LawnComponent', () => {
  let component: LawnComponent;
  let fixture: ComponentFixture<LawnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
