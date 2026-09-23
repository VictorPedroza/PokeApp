import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFoot } from './sidebar-foot';

describe('SidebarFoot', () => {
  let component: SidebarFoot;
  let fixture: ComponentFixture<SidebarFoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarFoot],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
