import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from '../components/general/flash-app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashRoutingModule } from './flash-routing.module';

// Material
import { MatButtonModule } from '@angular/material/button';

// Custom Components
import { FlashButtonComponent } from '../components/general/flash-button/flash-button.component';
import { FlashDeckComponent } from '../components/general/flash-deck/flash-deck.component';
import { FlashHeaderComponent } from '../components/general/flash-header/flash-header.component';

// Pages
import { DecksPageComponent } from '../components/pages/decks/decks.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';

// Services
import { DeckService } from '../services/deck.service';
import { InMemoryDataService } from '../services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DecksPageComponent,
    FlashButtonComponent,
    FlashDeckComponent,
    FlashHeaderComponent,
    TemplatesPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlashRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    MatButtonModule,
  ],
  providers: [DeckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
