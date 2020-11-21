import {Notification} from './Notification.class';

export class NotificationList {
  private static id = 1;

  public id: number;
  public isDefault: boolean;
  public list: Notification[];

  constructor(data: any) {
    this.id = NotificationList.id++;
    this.isDefault = data.isDefault !== undefined ? data.isDefault : false;
    this.list = data.list;
  }
}
