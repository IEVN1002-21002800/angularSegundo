import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacoCComponent } from './zodiaco-c.component';

describe('ZodiacoCComponent', () => {
  let component: ZodiacoCComponent;
  let fixture: ComponentFixture<ZodiacoCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacoCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZodiacoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
