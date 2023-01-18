import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';

import SimpleBar, { SimpleBarOptions } from 'simplebar-core';

@Component({
  selector: 'ngx-simplebar',
  host: { 'data-simplebar': 'init' },
  templateUrl: './simplebar-angular.component.html',
  styleUrls: [
    '../../../simplebar-core/src/simplebar.css',
    './simplebar-angular.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SimplebarAngularComponent implements OnInit, AfterViewInit {
  @Input('options') options: Partial<SimpleBarOptions> = {};

  elRef: ElementRef;
  SimpleBar: any;
  ariaLabel: string;

  constructor(elRef: ElementRef, private zone: NgZone) {
    this.elRef = elRef;
    this.ariaLabel =
      this.options.ariaLabel || SimpleBar.defaultOptions.ariaLabel;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.SimpleBar = new SimpleBar(
        this.elRef.nativeElement,
        this.options || {}
      );
    });
  }

  ngOnDestroy() {
    this.SimpleBar.unMount();
    this.SimpleBar = null;
  }
}
