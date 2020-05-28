import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Overvieuw6Component } from './overvieuw6.component';

describe('Overvieuw6Component', () => {
  let component: Overvieuw6Component;
  let fixture: ComponentFixture<Overvieuw6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Overvieuw6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Overvieuw6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
