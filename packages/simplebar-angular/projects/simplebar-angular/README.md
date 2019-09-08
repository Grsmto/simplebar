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

```css
.container {
  border-radius: 6px;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px dashed;
  margin: auto;
}

ngx-simplebar {
  width: 200px;
  height: 200px;
}
```
