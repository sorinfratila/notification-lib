import { Component, OnInit } from '@angular/core';
import {NgxNotifService} from 'ngx-notif';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notifService: NgxNotifService) {
  }

  ngOnInit(): void {
  }

  showWarning(): void {
    this.notifService.warning({
      message: 'WARNING! This is a longer message that I have not thought about for a long time' + Math.ceil(Math.random() * 100),
    });
  }

  showNeutral(): void {
    this.notifService.neutral({
      message: 'NEUTRAL! ' + Math.ceil(Math.random() * 100),
    });
  }

  showInfo(): void {
    this.notifService.info({
      message: 'INFO! This is a longer message that I have not thought about for a long time, but I am just writing here a long long message that poroba make4s no sense' + Math.ceil(Math.random() * 100),
      confirmed: true
    });
  }

  showInfoOK(): void {
    this.notifService.info({
      message: 'INFO_OK! This is a longer message that I have not thought about for a long time,' + Math.ceil(Math.random() * 100),
      confirmed: false,
    });
  }

}
