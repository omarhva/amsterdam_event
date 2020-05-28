import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Overvieuw3Component } from './overvieuw3.component';

describe('Overvieuw3Component', () => {
  let component: Overvieuw3Component;
  let fixture: ComponentFixture<Overvieuw3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Overvieuw3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Overvieuw3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
