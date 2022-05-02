import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolerDialogComponent } from './cooler-dialog.component';

describe('CoolerDialogComponent', () => {
  let component: CoolerDialogComponent;
  let fixture: ComponentFixture<CoolerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
