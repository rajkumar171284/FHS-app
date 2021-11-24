import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartsPage } from './charts.page';
import { ApiService } from '../../api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('ChartsPage', () => {
  let component: ChartsPage;
  let fixture: ComponentFixture<ChartsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsPage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule],
      providers:[ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
