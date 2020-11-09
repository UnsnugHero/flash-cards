import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'flash-button',
  templateUrl: './flash-button.component.html',
  styleUrls: ['./flash-button.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashButtonComponent {
  /** Color of button, primary by default */
  @Input() color: string = 'primary';
  /** Controls if button is disabled */
  @Input() disabled: boolean = false;
  /** Disables the styling applied when hover over the button */
  @Input() disableHoverStyle: boolean = false;
  /** Disables the ripple animation on button click */
  @Input() disableRipple: boolean = false;
  /** Enables styling to give button deck look for decks page */
  @Input() enableDeckStyling: boolean = false;
  /** controls height of button */
  @Input() height: string;
  /** Icon if icon button type */
  @Input() icon: string;
  /** Button text if a text button */
  @Input() text: string;
  /** tooltip shows on hover */
  @Input() tooltip: string;
  /** tooltip color */
  @Input() tooltipColor: string;
  /** Controls button type */
  @Input() type: 'text' | 'icon'; //can add more if needed. Maybe export as a type in constants
  /** Controls width of button */
  @Input() width: string;

  /** Emitter for button click */
  @Output() onButtonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log(this.text);
    console.log(this.disabled);
  }

  // this seems like a stupid/unnecessary method but we'll roll with it lol
  public constructTooltipClass() {
    return this.tooltipColor
      ? `custom-tooltip ${this.tooltipColor}`
      : 'custom-tooltip primary-color';
  }

  public handleButtonClick(event) {
    this.onButtonClick.emit(event);
  }
}
