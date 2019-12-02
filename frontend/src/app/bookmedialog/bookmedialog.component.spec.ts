import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmedialogComponent } from './bookmedialog.component';

describe('BookmedialogComponent', () => {
  let component: BookmedialogComponent;
  let fixture: ComponentFixture<BookmedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmedialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
