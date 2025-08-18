import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityChangeComponent } from './quantity-change.component';

describe('QuantityChangeComponent', () => {
  let component: QuantityChangeComponent;
  let fixture: ComponentFixture<QuantityChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
