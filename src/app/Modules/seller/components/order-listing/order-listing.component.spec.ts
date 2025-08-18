import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListingComponent } from './order-listing.component';

describe('OrderListingComponent', () => {
  let component: OrderListingComponent;
  let fixture: ComponentFixture<OrderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
