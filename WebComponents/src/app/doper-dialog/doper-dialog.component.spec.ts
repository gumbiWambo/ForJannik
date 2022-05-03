import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoperDialogComponent } from './doper-dialog.component';

describe('DoperDialogComponent', () => {
  let component: DoperDialogComponent;
  let fixture: ComponentFixture<DoperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoperDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
