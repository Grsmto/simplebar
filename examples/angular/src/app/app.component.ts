import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimplebarAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
  numbers = Array(50).fill(0);
  options = { autoHide: false };
}
