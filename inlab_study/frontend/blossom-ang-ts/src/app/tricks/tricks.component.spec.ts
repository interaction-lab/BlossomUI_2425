import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TricksComponent } from './tricks.component';

describe('TricksComponent', () => {
  let component: TricksComponent;
  let fixture: ComponentFixture<TricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TricksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
