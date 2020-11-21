import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Notification} from '../../model/Notification.class';
import {NotifSpawnService} from '../notif-spawn/notif-spawn.service';

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
  private _notifList$ = new BehaviorSubject<INotif[]>([]);
  private _groupedNotifList$ = new BehaviorSubject<INotif[]>([]);
  private notifications$: Subject<INotif>;
  private _overflow = false;

  private testNotifList: Notification[] = [];

  constructor(private spawn: NotifSpawnService) {
    NgxNotifService.id = 1;
    this.notifications$ = new Subject<INotif>();
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

  public setNotifList(notifItem: (INotif[] | INotif)): void {
    let newNotifList;
    if (Array.isArray(notifItem)) newNotifList = [...notifItem];

    else {
      newNotifList = [...this._notifList$.getValue()];
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

    if (newGroupNotifList.length > 3) this._overflow = true;

    this._groupedNotifList$.next(newGroupNotifList);
  }

  public removeGroupedNotification(id: number): void {
    const notifListCopy = [...this._groupedNotifList$.getValue()];
    const index = notifListCopy.findIndex(notif => notif.id === id);

    if (index !== -1) notifListCopy.splice(index, 1);
    if (notifListCopy.length < 3) this._overflow = false;
    if (notifListCopy.length <= 3 && this._overflow) this.restoreNotifList(notifListCopy);
    else this.setGroupedNotifList(notifListCopy);
  }

  public restoreNotifList(newList: INotif[]): void {
    this.setGroupedNotifList([]);
    this.setNotifList(newList);
  }

  public removeNotification(index): void {
    if (index === -1) return;
    const notifListCopy = this._notifList$.getValue().slice();
    notifListCopy.splice(index, 1);
    this.setNotifList(notifListCopy);
  }

  private filterNotif(message: INotif): void {
    if (message) {
      switch (message.severity) {
        case 'warning': {
          this.setGroupedNotifList(message);
          if (this._groupedNotifList$.getValue().length > 3) {
            this.setNotifList(this._notifList$.getValue().filter(not => not.confirmed));
          } else this.setNotifList(message);
          break;
        }
        case 'info': {
          if (!message.confirmed) {
            this.setGroupedNotifList(message);
            if (this._groupedNotifList$.getValue().length > 3) {
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

    this.testNotifList.push(new Notification(payload));
    console.log(this.testNotifList);
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

    this.testNotifList.push(new Notification(payload));
    console.log(this.testNotifList);
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

    this.testNotifList.push(new Notification(payload));
    console.log(this.testNotifList);
  }

}
