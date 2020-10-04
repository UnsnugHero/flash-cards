import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderItem } from 'src/app/models/component.model';
import { HEADER_LINKS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public headerLinks: HeaderItem[] = HEADER_LINKS;
}
