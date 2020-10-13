import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {INotif, NgxNotifService} from '../ngx-notif.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notif-container',
  templateUrl: './notif-container.component.html',
  // styleUrls: ['./notif-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifContainerComponent {
  @Output() closeNotif: EventEmitter<any> = new EventEmitter();

  messageSub: Subscription;

  public overflow$: Observable<boolean>;
  public notifications$: Observable<INotif[]>;
  public groupedNotifications$: Observable<INotif[]>;

  constructor(private notifService: NgxNotifService) {
    this.overflow$ = this.notifService.overflow$;
    this.notifications$ = this.notifService.notifList$;
    this.groupedNotifications$ = this.notifService.groupedNotifList$;
  }

  /**
   * Method triggered when notifications time out or when ok button is clicked
   * trigerring this method results in the removal of the notifications from the notification container
   * @param event the event that results from this action which contains the notification object,
   * an index that represents the position of the notification in the notification-container
   * and whether the notification timed out
   */
  onMessageClose(event: any): void {
    if (!event.timedOut) {
      event.notification.confirmed = true;
    }
    this.notifService.removeNotification(event.index);

    this.closeNotif.emit({
      notification: event.notification
    });
  }


}
