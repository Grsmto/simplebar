import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimplebarAngularModule } from '../../../../dist/simplebar-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SimplebarAngularModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
