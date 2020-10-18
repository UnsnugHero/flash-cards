import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SelectOption } from 'src/app/models/component.model';

@Component({
  selector: 'flash-select',
  templateUrl: './flash-select.component.html',
  styleUrls: ['./flash-select.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashSelectComponent {
  // Text displayed for select menu
  @Input() selectText;
  // Select options
  @Input() selectOptions: SelectOption[];

  // Event Emitter for selecting a select option
  @Output() onOptionClick = new EventEmitter<SelectOption>();

  constructor() {}

  ngOnInit() {}

  public handleOptionClick(selectEvent: SelectOption) {
    this.onOptionClick.emit(selectEvent);
  }
}
