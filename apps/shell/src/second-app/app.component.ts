import { createMessage } from '@angular-architects/microapp/messaging';
import { Component } from '@angular/core';


const sendUserDetails = createMessage<{
  name: string,
  conf: string
}>('userdetails');


@Component({
  selector: 'microapp-root-2',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';

  sendMessage(): void {
    sendUserDetails({
      name: 'Michael',
      conf: ''
    });
  }
}
