import {Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {INotif, NgxNotifService} from '../ngx-notif.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notif-container',
  templateUrl: './notif-container.component.html',
  // styleUrls: ['./notif-container.component.css'],
})
export class NotifContainerComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    // this.messageSub = this.notifService.getNotification$().subscribe(
    //   /**
    //    * processing the incoming notifications and separating them between confirmed warning notifications and
    //    * confirmed/unconfirmed info notifications;
    //    */
    //   message => {
    //     console.log('[NOTIF-CONTAINER MESSAGE]', message);
    //     if (message) {
    //       console.log('message', message);
    //       if (message.severity === 'warning') { // message here are only warnings
    //         this.notifService.setGroupedNotification(message);
    //         this.grouppedNotifications = this.notifService.getGroupedNotifications();
    //         if (this.grouppedNotifications.size > 3) {
    //           this.notifService.setOverflow$(true);
    //           this.notifications = this.notifications.filter(not => not.confirmed);
    //         } else { // there are 3 or less warnings on the screen
    //           this.notifications.push(message);
    //         }
    //       } else { // message here are of type info and are not confirmed
    //         if (message.severity === 'info' && !message.confirmed) {
    //           this.notifService.setGroupedNotification(message);
    //           this.grouppedNotifications = this.notifService.getGroupedNotifications();
    //           if (this.grouppedNotifications.size > 3) {
    //             this.notifService.setOverflow$(true);
    //             this.notifications = this.notifications.filter(not => not.confirmed);
    //           } else { // there are 3 or less unconfirmed infos on the screen
    //             this.notifications.push(message);
    //           }
    //         } else if (message.severity === 'neutral') { // message here are info and are confirmed, they have a timeout
    //           this.notifications.push(message);
    //           this.filterNotifications();
    //         }
    //       }
    //     }
    //   }
    // );
  }

  ngOnDestroy(): void {
    if (this.messageSub) this.messageSub.unsubscribe();
  }

  /**
   * helper function that filters out the timed/confirmed notifications of type info when there are more than 3 on the screen
   */
  // filterNotifications = () => {
  //   const testArray = this.notifications.filter(not => not.severity === 'info' && not.confirmed);
  //   if (testArray.length > 3) {
  //     const index = this.notifications.findIndex(not => not.severity === 'info' && not.confirmed);
  //     this.notifications.splice(index, 1);
  //   }
  // }

  /**
   * function to check if the grouppedNotifications array has at least one notification of type warning
   */
  checkForColor = () => {
    let isAnySevere = false;
    this.notifService.getGroupedNotifications().forEach((n: INotif) => {
      if (n.severity === 'warning') isAnySevere = true;
    });
    return isAnySevere;
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
    // this.notifications.splice(event.index, 1);

    this.closeNotif.emit({
      notification: event.notification
    });
  }


}
