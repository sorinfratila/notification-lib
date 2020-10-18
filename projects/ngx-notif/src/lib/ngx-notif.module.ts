import { NgModule } from '@angular/core';
import { NgxNotifComponent } from './ngx-notif.component';
import { NotifContainerComponent } from './notif-container/notif-container.component';
import { CommonModule } from '@angular/common';
import { NgxNotifService } from './ngx-notif.service';
import { CheckSeverityPipe } from './check-severity.pipe';
import { GetIconPipe } from './get-icon.pipe';


@NgModule({
  declarations: [NgxNotifComponent, NotifContainerComponent, CheckSeverityPipe, GetIconPipe],
  imports: [
    CommonModule
  ],
  exports: [NgxNotifComponent, NotifContainerComponent]
})
export class NgxNotifModule {
  static forRoot() {
    return {
      ngModule: NgxNotifModule,
      providers: [NgxNotifService]
    };
  }
}
