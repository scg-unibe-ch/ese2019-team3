import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigthAndStageComponent } from './ligth-and-stage.component';

describe('LigthAndStageComponent', () => {
  let component: LigthAndStageComponent;
  let fixture: ComponentFixture<LigthAndStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigthAndStageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigthAndStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
