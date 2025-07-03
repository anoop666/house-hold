import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DropDown, HouseholdOverview } from './household.model';
import { houseHoldEndPoints } from './household.endpoints';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({ providedIn: 'root' })
export class HouseholdService {
  constructor(private http: HttpService) {}

  getHouseHoldTypes(): Observable<DropDown[]> {
    return this.http.get(`${houseHoldEndPoints.houseHoldType}?lang=en`);
  }
  
  getRegions(): Observable<DropDown[]> {
    return this.http.get(`${houseHoldEndPoints.region}?lang=en`);
  }
  
  getHouseHoldOverview(data:object): Observable<HouseholdOverview> {
    return this.http.post(`${houseHoldEndPoints.overview}?lang=en`,data);
  }
}
