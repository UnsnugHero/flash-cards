import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPage } from '@pages/categories/categories.page';
import { DecksPage } from '@pages/decks/decks.page';
import { DeckOverviewPage } from '@pages/deck-overview/deck-overview.page';
import { TemplatesPageComponent } from '@pages/templates/templates.component.page';
import { NotFoundPage } from '@pages/not-found/not-found.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'decks' },
  { path: 'categories', component: CategoriesPage },
  { path: 'decks', component: DecksPage },
  { path: 'deck/:id', component: DeckOverviewPage },
  { path: 'templates', component: TemplatesPageComponent },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FlashRoutingModule {}
