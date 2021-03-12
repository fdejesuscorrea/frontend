import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntercarComponent } from './entercar.component';

describe('EntercarComponent', () => {
  let component: EntercarComponent;
  let fixture: ComponentFixture<EntercarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntercarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntercarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
