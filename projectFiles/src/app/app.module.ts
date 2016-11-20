import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlickerControlComponent } from './flicker-control/flicker-control.component';
import { AboutComponent } from './about/about.component';

import { FlickerCycleService } from './flicker-cycle.service';

// TODO: move flicker-control to another module???
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FlickerControlComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'flicker', component: FlickerControlComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
  ],
  providers: [
    FlickerCycleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
