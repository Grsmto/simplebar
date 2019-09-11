import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplebar-tester';
  numbers = Array(50).fill(0);
  options = { autoHide: false, forceVisible: 'x', scrollbarMinSize: 100 };
}
