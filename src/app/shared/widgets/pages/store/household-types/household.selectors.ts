import { createFeatureSelector, createSelector } from "@ngrx/store";
import { householdKeyName, regionKeyName, State } from "./household.reducer";

export const selectHouseHold = createFeatureSelector<State>(householdKeyName);
export const selectRegion = createFeatureSelector<State>(regionKeyName);


export const selectHouseHoldResponse = createSelector(
  selectHouseHold,
  (state: State) => {
    return state;
  }
);

export const selectRegionResponse = createSelector(
  selectRegion,
  (state: State) => {
    return state;
  }
);  