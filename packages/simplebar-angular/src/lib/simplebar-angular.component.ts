import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

import SimpleBar from 'simplebar/dist/simplebar-core.esm';
import { Options } from 'simplebar';

@Component({
  selector: 'ngx-simplebar',
  host: { 'data-simplebar': 'init' },
  templateUrl: './simplebar-angular.component.html',
  styleUrls: [
    '../../../simplebar/src/simplebar.css',
    './simplebar-angular.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SimplebarAngularComponent implements OnInit, AfterViewInit {
  @Input('options') options: Options;

  elRef: ElementRef;
  SimpleBar: any;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.SimpleBar = new SimpleBar(this.elRef.nativeElement, this.options || {});
  }

  ngOnDestroy() {
    this.SimpleBar.unMount();
    this.SimpleBar = null;
  }
}
