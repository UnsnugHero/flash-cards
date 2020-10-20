import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPage } from '../components/pages/categories/categories.page';
import { DecksPage } from '../components/pages/decks/decks.page';
import { DeckOverviewPage } from '../components/pages/deck-overview/deck-overview.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';
import { NotFoundPage } from '../components/pages/not-found/not-found.page';

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
