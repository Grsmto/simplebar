import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplebarAngularComponent } from './simplebar-angular.component';

describe('SimplebarAngularComponent', () => {
  let component: SimplebarAngularComponent;
  let fixture: ComponentFixture<SimplebarAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimplebarAngularComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplebarAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with options', () => {
    component.options = { autoHide: false };
    expect(component).toBeTruthy();
  });

  it('should define simplebar instance', () => {
    expect(component.SimpleBar).toBeDefined();
  });
});
