import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Overvieuw1Component } from './overvieuw1.component';

describe('Overvieuw1Component', () => {
  let component: Overvieuw1Component;
  let fixture: ComponentFixture<Overvieuw1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Overvieuw1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Overvieuw1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
