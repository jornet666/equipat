import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMenuComponent } from './agregar-menu.component';

describe('AgregarMenuComponent', () => {
  let component: AgregarMenuComponent;
  let fixture: ComponentFixture<AgregarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
