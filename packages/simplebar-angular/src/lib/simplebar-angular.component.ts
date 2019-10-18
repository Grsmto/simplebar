import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import SimpleBar from 'simplebar';

@Component({
  selector: 'ngx-simplebar',
  templateUrl: './simplebar-angular.component.html',
  styleUrls: [
    '../../../simplebar/src/simplebar.css',
    './simplebar-angular.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SimplebarAngularComponent implements OnInit, AfterViewInit {
  @Input() options: Options;

  @ViewChild('simplebar', { static: true }) simplebar: ElementRef;

  SimpleBar: any;

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.SimpleBar = new SimpleBar(
      this.simplebar.nativeElement,
      this.options ? this.options : {}
    );
  }
}

export interface Options {
  autoHide?: boolean;
  scrollbarMinSize?: number;
  classNames?: {};
  forceVisible?: any;
}
