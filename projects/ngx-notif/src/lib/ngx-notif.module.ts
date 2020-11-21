import { NgModule } from '@angular/core';
import { NgxNotifComponent } from './notif-item/ngx-notif.component';
import { NotifContainerComponent } from './notif-container/notif-container.component';
import { CommonModule } from '@angular/common';
import { NgxNotifService } from './services/notif/ngx-notif.service';
import { CheckSeverityPipe } from './pipes/check-severity.pipe';
import { GetIconPipe } from './pipes/get-icon.pipe';


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
