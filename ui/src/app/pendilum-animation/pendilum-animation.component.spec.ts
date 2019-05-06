import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendilumAnimationComponent } from './pendilum-animation.component';

describe('PendilumAnimationComponent', () => {
  let component: PendilumAnimationComponent;
  let fixture: ComponentFixture<PendilumAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendilumAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendilumAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
