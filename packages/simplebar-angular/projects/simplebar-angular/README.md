# SimplebarAngular

## Installation

```
npm i simplebar
npm i simplebar-angular
```

## Usage

### Import module

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SimplebarAngularModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Use component

```js
<div class="container">
  <ngx-simplebar [options]="options">
    <div *ngFor="let number of numbers">ngx-simplebar</div>
  </ngx-simplebar>
</div>

```
