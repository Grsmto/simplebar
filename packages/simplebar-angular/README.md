<p align="center">
  <img src="https://user-images.githubusercontent.com/527559/66231995-3cd0c380-e6be-11e9-8782-c50c834aac93.png" width="570"  alt="SimpleBar" />
</p>
<br/>
<p align="center" style="margin: 40px;">
  <a href="https://npmjs.org/package/simplebar-angular"><img alt="NPM version" src="https://img.shields.io/npm/v/simplebar.svg?style=flat-square" /></a>
  <a href="https://npmjs.org/package/simplebar-angular"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/simplebar.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/grsmto/simplebar"><img alt="Build Status" src="https://img.shields.io/travis/grsmto/simplebar/master.svg?style=flat-square" /></a>
  <a href="https://automate.browserstack.com/public-build/amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%"><img src='https://automate.browserstack.com/badge.svg?badge_key=amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%'/></a>
</p>
<br/>

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
