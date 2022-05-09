import { Component } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }
}
