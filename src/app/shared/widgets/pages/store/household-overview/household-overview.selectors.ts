import { createFeatureSelector, createSelector } from "@ngrx/store";
import { householdOverviewKeyName, overviewState } from "./household-overview.reducer";

export const selectHouseHoldOverview = createFeatureSelector<overviewState>(householdOverviewKeyName);


export const selectHouseHoldResponse = createSelector(
  selectHouseHoldOverview,
  (state: overviewState) => {
    return state;
  }
);