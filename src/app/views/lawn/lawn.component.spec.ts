import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawnComponent } from './lawn.component';
import { Lawn } from 'src/app/models/lawn.model';
import { Mower } from 'src/app/models/mower.model';
import { LawnField } from 'src/app/models/interfaces/lawn-field.interface';

describe('LawnComponent', () => {
  let component: LawnComponent;
  let fixture: ComponentFixture<LawnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LawnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawnComponent);
    component = fixture.componentInstance;

    let expectedLawn = new Lawn('5', '5');
    component.lawn = expectedLawn;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should add mower to lawn', () => {
    let mower = component.addMower({ x: '1', y: '1', direction: 'E' });

    component.lawn.fieldMap.forEach((field: LawnField) => {
      if (field.position.x === mower.mowerPostion.x
        && field.position.y === mower.mowerPostion.y) {
        expect(field.mower).toBe(mower);
      }
    });
  })

  it('should move mower 1', () => {
    let mower = component.addMower({ x: '1', y: '2', direction: 'N' });
    component.moveMower('LFLFLFLFF', mower);

    expect(mower.mowerPostion.x).toBe('1');
    expect(mower.mowerPostion.y).toBe('3');
    expect(mower.mowerPostion.direction).toBe('N');
  })

  it('should move mower 2', () => {
    let mower = component.addMower({ x: '3', y: '3', direction: 'E' });
    component.moveMower('FFRFFRFRRF', mower);

    expect(mower.mowerPostion.x).toBe('5');
    expect(mower.mowerPostion.y).toBe('1');
    expect(mower.mowerPostion.direction).toBe('E');
  })
});
