import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuilderComponent } from './team-builder-component';

describe('TeamBuilderComponent', () => {
  let component: TeamBuilderComponent;
  let fixture: ComponentFixture<TeamBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamBuilderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
