import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContentManagementComponent } from './add-edit-content-management.component';

describe('AddEditContentManagementComponent', () => {
  let component: AddEditContentManagementComponent;
  let fixture: ComponentFixture<AddEditContentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditContentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
