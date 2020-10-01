import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksPageComponent } from '../components/pages/decks/decks.page';
import { TemplatesPageComponent } from '../components/pages/templates/templates.component.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'decks' },
  { path: 'decks', component: DecksPageComponent },
  { path: 'templates', component: TemplatesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FlashRoutingModule {}
