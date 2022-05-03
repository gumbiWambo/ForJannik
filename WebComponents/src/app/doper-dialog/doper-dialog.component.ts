import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doper-dialog',
  templateUrl: './doper-dialog.component.html',
  styleUrls: ['./doper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoperDialogComponent implements OnInit {

  public showToken = '';
  public showUrl = '';

  @Input()
  set token (value: string) {
    this.showToken = value;
    this.cd.detectChanges();
  }

  @Input()
  set url (value: string) {
    this.showUrl = value;
    this.cd.detectChanges();
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

}
