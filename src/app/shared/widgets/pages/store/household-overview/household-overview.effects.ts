import { Injectable } from "@angular/core";
import { HouseholdService } from "../../common/household.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HouseholdOverviewActions } from "./household-overview.action";




@Injectable()
export class HouseholdOverviewEffects {
  loadHouseholdOverview$;
  constructor(private householdService: HouseholdService,private actions: Actions) {
    this.loadHouseholdOverview$ = createEffect(() =>
    this.actions.pipe(
      ofType(HouseholdOverviewActions.loadHouseholdOverview),
      switchMap(({payload}) =>
        this.householdService.getHouseHoldOverview(payload).pipe(
          map(overview => HouseholdOverviewActions.loadHouseholdOverviewSuccess({ overview })),
          catchError(error => of(HouseholdOverviewActions.loadHouseholdOverviewFailure({ error })))
        )
      )
    )
  );
  }

}