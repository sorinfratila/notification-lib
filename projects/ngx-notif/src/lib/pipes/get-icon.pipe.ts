import { Pipe, PipeTransform } from '@angular/core';
import {INotif} from '../ngx-notif.service';

@Pipe({
  name: 'getIcon'
})
export class GetIconPipe implements PipeTransform {

  transform(value: INotif[]): string {
    // return value.find()
    // return ;
    return null;
  }

}
