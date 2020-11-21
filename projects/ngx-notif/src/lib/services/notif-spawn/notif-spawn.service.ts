import { Injectable } from '@angular/core';
import {Notification} from '../../model/Notification.class';

@Injectable()
export class NotifSpawnService {

  constructor() {

  }

  public warning(data: any): Notification {
    const payload = {
      severity: 'warning',
      message: data.message ?? 'This is a warning notification',
      confirmed: false,
      timeout: null,
    };

    return new Notification(payload);
  }

  public info(data: any): Notification {
    const payload = {
      severity: 'info',
      message: data.message ?? 'This is an info notification',
      confirmed: data.confirmed,
      timeout: data.confirmed === true ? 5000 : null
    };

    return new Notification(payload);
  }

  public neutral(data: any): Notification {
    const payload = {
      severity: 'neutral',
      message: data.message ?? 'This is a neutral notification',
      confirmed: true,
      timeout: 5000,
    };

    return new Notification(payload);
  }
}
