import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { yieldFormulasComponent } from './heroes.component';

describe('yieldFormulasComponent', () => {
  let component: yieldFormulasComponent;
  let fixture: ComponentFixture<yieldFormulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [yieldFormulasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(yieldFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
