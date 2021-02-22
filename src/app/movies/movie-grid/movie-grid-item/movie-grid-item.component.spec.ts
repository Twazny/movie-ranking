import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridItemComponent } from './movie-grid-item.component';

describe('MovieGridItemComponent', () => {
  let component: MovieGridItemComponent;
  let fixture: ComponentFixture<MovieGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
