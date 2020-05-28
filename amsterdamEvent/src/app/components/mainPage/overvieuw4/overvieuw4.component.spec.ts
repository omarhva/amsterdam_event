import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Overvieuw4Component } from './overvieuw4.component';

describe('Overvieuw4Component', () => {
  let component: Overvieuw4Component;
  let fixture: ComponentFixture<Overvieuw4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Overvieuw4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Overvieuw4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
