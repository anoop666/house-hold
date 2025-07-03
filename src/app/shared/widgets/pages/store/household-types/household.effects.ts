import { Injectable } from "@angular/core";
import { HouseholdService } from "../../common/household.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { HouseholdActions, RegionActions } from "./household.action";




@Injectable()
export class HouseholdEffects {
  loadHouseholds$;
  loadRegions$;

  constructor(private actions$: Actions,private householdService: HouseholdService) {
    this.loadHouseholds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.loadHouseholdType),
      switchMap(() =>
        this.householdService.getHouseHoldTypes().pipe(
          map(households => HouseholdActions.loadHouseholdTypeSuccess({ households })),
          catchError(error => of(HouseholdActions.loadHouseholdTypeFailure({ error })))
        )
      )
    )
  );

  this.loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.loadRegion),
      switchMap(() =>
        this.householdService.getRegions().pipe(
          map(region => RegionActions.loadRegionSuccess({ region })),
          catchError(error => of(RegionActions.loadRegionFailure({ error })))
        )
      )
    )
  );
  }

  
  
  
}