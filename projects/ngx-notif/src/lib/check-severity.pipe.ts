import { Pipe, PipeTransform } from '@angular/core';
import {INotif} from './ngx-notif.service';

@Pipe({
  name: 'checkSeverity'
})
export class CheckSeverityPipe implements PipeTransform {

  transform(value: INotif[]): string {
    const isAnySevere = !!value.find((notif: INotif) => notif.severity === 'warning');
    return isAnySevere ? 'notification__item__warning' : 'notification__item__info';
  }

}
