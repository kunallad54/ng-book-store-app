import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerficationComponent } from './user-verfication.component';

describe('UserVerficationComponent', () => {
  let component: UserVerficationComponent;
  let fixture: ComponentFixture<UserVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
