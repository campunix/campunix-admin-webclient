import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreateComponent } from './organization-create.component';

describe('DepartmentsCreateComponent', () => {
  let component: OrganizationCreateComponent;
  let fixture: ComponentFixture<OrganizationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
