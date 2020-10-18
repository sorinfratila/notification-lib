import { Pipe, PipeTransform } from '@angular/core';
import { INotif } from './ngx-notif.service';

@Pipe({
  name: 'checkSeverity',
  pure: true,
})
export class CheckSeverityPipe implements PipeTransform {

  transform(value: INotif[]): string {
    const isAnySevere = !!value.find((notif: INotif) => notif.severity === 'warning');
    return isAnySevere ? 'warning' : 'info';
  }
}
