import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPerfilComponent } from './agregar-perfil.component';

describe('AgregarPerfilComponent', () => {
  let component: AgregarPerfilComponent;
  let fixture: ComponentFixture<AgregarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
