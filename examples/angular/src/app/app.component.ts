import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimplebarAngularModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
  numbers = Array(50).fill(0);
  options = { autoHide: false };
}
