import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'microapp-root-2',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';

  constructor(private router: Router) {
    this.router.initialNavigation();
  }
}
