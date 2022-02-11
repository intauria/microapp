import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroAppRoutingModule } from '@angular-architects/microapp/routing';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UseCaseComponent } from './use-case/use-case.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, UseCaseComponent],
  imports: [
    BrowserModule,
    MicroAppRoutingModule.forMicroApp({ name: 'app-2' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class SecondAppModule {}
