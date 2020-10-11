import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export type severityEnum = 'warning' | 'info' | 'error' | 'neutral';

export interface INotif {
  id: number;
  message: string;
  severity: severityEnum;
  confirmed: boolean;
  createdAt: Date;
  timeout: number;
}

@Injectable()
export class NgxNotifService {

  static id: number;
  // tslint:disable-next-line:variable-name
  private _overflow$ = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:variable-name
  private _notifList$ = new BehaviorSubject<INotif[]>([]);
  // tslint:disable-next-line:variable-name
  private _grouppedNotifList$ = new BehaviorSubject<INotif[]>([]);
  private groupedNotifications: Map<number, INotif>;
  private notifications$: Subject<INotif>;

  constructor() {
    NgxNotifService.id = 1;
    this.notifications$ = new Subject<INotif>();
    this.groupedNotifications = new Map();
  }

  get id(): number {
    return NgxNotifService.id++;
  }

  get notifList$(): Observable<INotif[]> {
    return this._notifList$.asObservable();
  }

  get grouppedNotifList$(): Observable<INotif[]> {
    return this._grouppedNotifList$.asObservable();
  }

  get overflow$(): Observable<boolean> {
    return this._overflow$.asObservable();
  }

  public setNotifList(notif: INotif): void {
    const notifListCopy = this._notifList$.getValue();
    notifListCopy.push(notif);
    this._notifList$.next(notifListCopy);
  }

  public setGrouppedNotifList(notif: INotif): void {
    const notifListCopy = this._grouppedNotifList$.getValue();
    notifListCopy.push(notif);
    this._grouppedNotifList$.next(notifListCopy);
  }

  public setOverflow$(value: boolean): void {
    this._overflow$.next(value);
  }

  public getGroupedNotifications(): Map<number, INotif> {
    return this.groupedNotifications;
  }

  public setGroupedNotification(notification?: INotif): void {
    if (notification) this.groupedNotifications.set(notification.id, notification);
    else this.groupedNotifications = new Map();
  }

  public removeGroupedNotification(id: number): void {
    if (this.groupedNotifications.has(id)) this.groupedNotifications.delete(id);
  }

  public getNotification$(): Observable<INotif> {
    return this.notifications$.asObservable();
  }

  private filterNotif(message): void {
    if (message) {
      console.log('message', message);
      switch (message.severity) {
        case 'warning': {
          this.setGrouppedNotifList(message);
          if (this._grouppedNotifList$.getValue().length > 3) {
            this.setOverflow$(true);
            this.setNotifList(message);
          }
          break;
        }
        default: {
          break;
        }
      }
      // if (message.severity === 'warning') { // message here are only warnings
      //   this.notifService.setGroupedNotification(message);
      //   this.grouppedNotifications = this.notifService.getGroupedNotifications();
      //   if (this.grouppedNotifications.size > 3) {
      //     this.notifService.setOverflow$(true);
      //     this.notifications = this.notifications.filter(not => not.confirmed);
      //   } else { // there are 3 or less warnings on the screen
      //     this.notifications.push(message);
      //   }
      // } else { // message here are of type info and are not confirmed
      //   if (message.severity === 'info' && !message.confirmed) {
      //     this.notifService.setGroupedNotification(message);
      //     this.grouppedNotifications = this.notifService.getGroupedNotifications();
      //     if (this.grouppedNotifications.size > 3) {
      //       this.notifService.setOverflow$(true);
      //       this.notifications = this.notifications.filter(not => not.confirmed);
      //     } else { // there are 3 or less unconfirmed infos on the screen
      //       this.notifications.push(message);
      //     }
      //   } else if (message.severity !== 'neutral') { // message here are info and are confirmed, they have a timeout
      //     this.notifications.push(message);
      //     this.filterNotifications();
    //     }
    //   }
    }
  }

  /**
   * method that is issuing a notification of type warning
   */
  public warning(data: any): void {
    const payload: INotif = {
      id: this.id,
      severity: 'warning',
      message: data.message ?? 'This is a warning notification',
      createdAt: new Date(),
      confirmed: false,
      timeout: null,
    };

    this.notifications$.next(payload);
  }

  /**
   * method that is issuing a notification of type info
   */
  public info(data: any): void {
    const payload: INotif = {
      id: this.id,
      severity: 'info',
      message: data.message ?? 'This is an info notification',
      createdAt: new Date(),
      confirmed: data.confirmed,
      timeout: data.confirmed === true ? 5000 : null
    };

    console.log(payload);

    this.notifications$.next(payload);
  }

  /**
   * method that is issuing a notification of type neutral
   */
  public neutral(data: any): void {
    const payload: INotif = {
      id: this.id,
      severity: 'neutral',
      message: data.message ?? 'This is a neutral notification',
      createdAt: new Date(),
      confirmed: true,
      timeout: 5000,
    };

    console.log(payload);

    this.notifications$.next(payload);
  }

}
