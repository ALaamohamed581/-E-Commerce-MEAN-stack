import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreaturedProductsComponent } from './freatured-products.component';

describe('FreaturedProductsComponent', () => {
  let component: FreaturedProductsComponent;
  let fixture: ComponentFixture<FreaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreaturedProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
