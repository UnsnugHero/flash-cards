import { Component } from '@angular/core';
import { HeaderItem } from 'src/app/models/component.model';
import { HEADER_LINKS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public headerLinks: HeaderItem[] = HEADER_LINKS;
}
