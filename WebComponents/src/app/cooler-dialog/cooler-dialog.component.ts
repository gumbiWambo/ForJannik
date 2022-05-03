import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cooler-dialog',
  templateUrl: './cooler-dialog.component.html',
  styleUrls: ['./cooler-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoolerDialogComponent implements OnInit {

  public showUrl = ''
  public showToken = ''

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


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
