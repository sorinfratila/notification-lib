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
  private _overflow$ = new BehaviorSubject<boolean>(false);
  private _notifList$ = new BehaviorSubject<INotif[]>([]);
  private _groupedNotifList$ = new BehaviorSubject<INotif[]>([]);
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

  get groupedNotifList$(): Observable<INotif[]> {
    return this._groupedNotifList$.asObservable();
  }

  get overflow$(): Observable<boolean> {
    return this._overflow$.asObservable();
  }

  public setNotifList(notifItem: (INotif[] | INotif)): void {
    let newNotifList;
    if (Array.isArray(notifItem)) newNotifList = [...notifItem];

    else {
      newNotifList = this._notifList$.getValue().slice();
      newNotifList.push(notifItem);
    }

    this._notifList$.next(newNotifList);
  }

  public setGroupedNotifList(notifItem: (INotif[] | INotif)): void {
    let newGroupNotifList;

    if (Array.isArray(notifItem)) newGroupNotifList = [...notifItem];

    else {
      newGroupNotifList = this._groupedNotifList$.getValue().slice();
      newGroupNotifList.push(notifItem);
    }

    this._groupedNotifList$.next(newGroupNotifList);
  }

  public setOverflow$(value: boolean): void {
    this._overflow$.next(value);
  }

  public getGroupedNotifications(): Map<number, INotif> {
    return this.groupedNotifications;
  }

  public removeGroupedNotification(id: number): void {
    if (this.groupedNotifications.has(id)) this.groupedNotifications.delete(id);
  }

  public removeNotification(index): void {
    const notifListCopy = this._notifList$.getValue().slice();
    notifListCopy.splice(index, 1);
    this.setNotifList(notifListCopy);
  }

  private filterNotif(message: INotif): void {
    console.log('message', message);
    if (message) {
      switch (message.severity) {
        case 'warning': {
          this.setGroupedNotifList(message);
          if (this._groupedNotifList$.getValue().length > 3) {
            // there are more than 3 notifs that require confirmation
            this.setOverflow$(true);
            this.setNotifList(this._notifList$.getValue().filter(not => not.confirmed));
          } else this.setNotifList(message);
          break;
        }
        case 'info': {
          if (!message.confirmed) {
            this.setGroupedNotifList(message);
            if (this._groupedNotifList$.getValue().length > 3) {
              // there are more than 3 notifs that require confirmation
              this.setOverflow$(true);
              this.setNotifList(this._notifList$.getValue().filter(not => not.confirmed));
            } else this.setNotifList(message); // there are 3 or less unconfirmed infos on the screen
          } else {
            //  message.confirmed
            this.setNotifList(message);
          }
          break;
        }
        case 'neutral': {
          this.setNotifList(message);
          break;
        }
        default: {
          this.setNotifList(message);
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

    this.filterNotif(payload);
    // this.notifications$.next(payload);
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

    this.filterNotif(payload);

    // this.notifications$.next(payload);
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

    this.filterNotif(payload);

    // this.notifications$.next(payload);
  }

}
