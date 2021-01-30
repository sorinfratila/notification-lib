import {Notification} from './Notification.class';

export class NotificationList {

  public name: string;
  public list: Notification[];

  constructor(data: any) {
    this.name = data.name || `${Math.ceil(Math.random() * 1000)}name`;
    this.list = data.list || [];
  }

  public getNotificationByID(id: number): Notification {
    return this.list.find(notif => notif.getId() === id);
  }

  public setNotification(notif: Notification): void {
    this.list.push(notif);
  }
}
