import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPage } from '../components/pages/categories/categories.page';
import { DecksPage } from '../components/pages/decks/decks.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'decks' },
  { path: 'categories', component: CategoriesPage },
  { path: 'decks', component: DecksPage },
  { path: 'templates', component: TemplatesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FlashRoutingModule {}
