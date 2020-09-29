import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/general/flash-app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatButtonModule } from '@angular/material/button';

// Custom Components
import { FlashButtonComponent } from '../components/general/flash-button/flash-button.component';
import { FlashHeaderComponent } from '../components/general/flash-header/flash-header.component';

// Pages
import { DecksPageComponent } from '../components/pages/decks/decks.component.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';

@NgModule({
  declarations: [
    AppComponent,
    DecksPageComponent,
    FlashButtonComponent,
    FlashHeaderComponent,
    TemplatesPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
