import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../components/general/flash-app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashRoutingModule } from './flash-routing.module';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

// Custom Components
import { FlashAutocompleteComponent } from '../components/general/flash-autocomplete/flash-autocomplete.component';
import { FlashButtonComponent } from '../components/general/flash-button/flash-button.component';
import { FlashDeckComponent } from '../components/general/flash-deck/flash-deck.component';
import { FlashHeaderComponent } from '../components/general/flash-header/flash-header.component';
import { FlashInputComponent } from '../components/general/flash-input/flash-input.component';
import { FlashMenuComponent } from '../components/general/flash-menu/flash-menu.component';

// Pages
import { CategoriesPage } from '../components/pages/categories/categories.page';
import { DecksPage } from '../components/pages/decks/decks.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';

// Services
import { DeckService } from '../services/deck.service';
import { InMemoryDataService } from '../services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,

    // Custom Components
    FlashAutocompleteComponent,
    FlashButtonComponent,
    FlashDeckComponent,
    FlashHeaderComponent,
    FlashInputComponent,
    FlashMenuComponent,

    // Pages
    CategoriesPage,
    DecksPage,
    TemplatesPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlashRoutingModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,

    // else
    ReactiveFormsModule,
  ],
  providers: [DeckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
