import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOnClickComponent } from './popup-on-click.component';

describe('PopupOnClickComponent', () => {
  let component: PopupOnClickComponent;
  let fixture: ComponentFixture<PopupOnClickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupOnClickComponent]
    });
    fixture = TestBed.createComponent(PopupOnClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
