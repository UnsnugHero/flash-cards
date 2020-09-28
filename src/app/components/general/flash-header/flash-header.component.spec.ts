import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashHeaderComponent } from './flash-header.component';

describe('FlashHeaderComponent', () => {
  let component: FlashHeaderComponent;
  let fixture: ComponentFixture<FlashHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
