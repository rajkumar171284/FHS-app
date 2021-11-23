import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageAlertsPage } from './manage-alerts.page';
import { ApiService } from '../../api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('ManageAlertsPage', () => {
  let component: ManageAlertsPage;
  let fixture: ComponentFixture<ManageAlertsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAlertsPage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule],
      providers:[ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAlertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
