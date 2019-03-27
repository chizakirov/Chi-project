import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeComponent } from './trade.component';

describe('TradeComponent', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  //Comment: you have an async but not await. What are we awaiting?
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
