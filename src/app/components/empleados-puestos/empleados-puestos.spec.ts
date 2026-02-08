import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosPuestos } from './empleados-puestos';

describe('EmpleadosPuestos', () => {
  let component: EmpleadosPuestos;
  let fixture: ComponentFixture<EmpleadosPuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosPuestos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosPuestos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
