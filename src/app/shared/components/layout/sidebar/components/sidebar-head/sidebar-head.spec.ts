import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHead } from './sidebar-head';

describe('SidebarHead', () => {
  let component: SidebarHead;
  let fixture: ComponentFixture<SidebarHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarHead],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarHead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
