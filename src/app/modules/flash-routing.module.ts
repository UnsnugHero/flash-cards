import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { AddCardsPage } from '@pages/add-cards/add-cards.page';
import { CategoriesPage } from '@pages/categories/categories.page';
import { DeckOverviewPage } from '@pages/deck-overview/deck-overview.page';
import { DecksPage } from '@pages/decks/decks.page';
import { NotFoundPage } from '@pages/not-found/not-found.page';
import { TemplatesPageComponent } from '@pages/templates/templates.component.page';

// figure out what to do with child paths on the dec overview thing with the 'deck/:id' path. keeps showing deck overview for
// some reason

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'decks' },
  { path: 'categories', component: CategoriesPage },
  { path: 'decks', component: DecksPage },
  { path: 'deck/:id', component: DeckOverviewPage },
  { path: 'deck/add-cards/:id', component: AddCardsPage },
  { path: 'templates', component: TemplatesPageComponent },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FlashRoutingModule {}
