import { NgModule } from '@angular/core';
import { NgxNotifComponent } from './ngx-notif.component';
import { NotifContainerComponent } from './notif-container/notif-container.component';
import {CommonModule} from '@angular/common';
import {NgxNotifService} from './ngx-notif.service';


@NgModule({
  declarations: [NgxNotifComponent, NotifContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxNotifComponent, NotifContainerComponent]
})
export class NgxNotifModule {
  // tslint:disable-next-line:typedef
  static forRoot() {
    return {
      ngModule: NgxNotifModule,
      providers: [NgxNotifService]
    };
  }
}
