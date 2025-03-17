import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PreferenceCreateComponent} from "./preference-create.component";

describe('PreferenceCreateComponent', () => {
  let component: PreferenceCreateComponent;
  let fixture: ComponentFixture<PreferenceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
