import { messageListener } from '@angular-architects/microapp/messaging';
import { Component } from '@angular/core';

const initialUserDetails = {
  name: '',
  conf: ''
};

@Component({
  selector: 'microapp-root-1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  userDetails = initialUserDetails;

  constructor() {
    this.listenMessage();
  }

  listenMessage(): void {
    messageListener<{
      name: string,
      conf: string
    }>('userdetails').subscribe(
      userDetails => this.userDetails = userDetails
    );
  }

  reset(): void {
    this.userDetails = initialUserDetails;
  }
}
