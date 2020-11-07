import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Project Self-Definitions
import { AppComponent } from '@components/flash-app/app.component';
import { FlashRoutingModule } from '@modules/flash-routing.module';

// Custom Components
import { FlashAutocompleteComponent } from '@components/flash-autocomplete/flash-autocomplete.component';
import { FlashButtonComponent } from '@components/flash-button/flash-button.component';
import { FlashCardComponent } from '@components/flash-card/flash-card.component';
import { FlashChipsAutocompleteComponent } from '@components/flash-chips-autocomplete/flash-chips-autocomplete.component';
import { FlashDeckComponent } from '@components/flash-deck/flash-deck.component';
import { FlashHeaderComponent } from '@components/flash-header/flash-header.component';
import { FlashInputComponent } from '@components/flash-input/flash-input.component';
import { FlashMenuComponent } from '@components/flash-menu/flash-menu.component';
import { FlashProgressSpinner } from '@components/flash-progress-spinner/flash-progress-spinner.component';
import { FlashSelectComponent } from '@components/flash-select/flash-select.component';
import { FlashTableComponent } from '@components/flash-table/flash-table.component';

// Dialogs
import { AddDeckDialog } from '@dialogs/add-deck/add-deck.dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import { EditCategoryDialog } from '@dialogs/edit-category/edit-category.dialog';

// Pages
import { AddCardsPage } from '@pages/add-cards/add-cards.page';
import { CategoriesPage } from '@pages/categories/categories.page';
import { DecksPage } from '@pages/decks/decks.page';
import { DeckOverviewPage } from '@pages/deck-overview/deck-overview.page';
import { NotFoundPage } from '@pages/not-found/not-found.page';
import { TemplatesPageComponent } from '@pages/templates/templates.component.page';

// Services
import { DeckService } from '@services/deck.service';
import { InMemoryDataService } from '@services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,

    // Custom Components
    FlashAutocompleteComponent,
    FlashButtonComponent,
    FlashCardComponent,
    FlashChipsAutocompleteComponent,
    FlashDeckComponent,
    FlashHeaderComponent,
    FlashInputComponent,
    FlashMenuComponent,
    FlashSelectComponent,
    FlashProgressSpinner,
    FlashTableComponent,

    // Dialogs
    AddDeckDialog,
    ConfirmDialog,
    EditCategoryDialog,

    // Pages
    AddCardsPage,
    CategoriesPage,
    DecksPage,
    DeckOverviewPage,
    NotFoundPage,
    TemplatesPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlashRoutingModule,
    FormsModule,
    HttpClientModule,

    // external
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    InfiniteScrollModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,

    // else
    ReactiveFormsModule,
  ],
  providers: [DeckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
