import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBannerComponent } from './ui-banner.component';

describe('UiBannerComponent', () => {
  let component: UiBannerComponent;
  let fixture: ComponentFixture<UiBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
