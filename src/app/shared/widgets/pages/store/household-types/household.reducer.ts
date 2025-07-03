import { createReducer, on } from "@ngrx/store";
import { DropDown } from "../../common/household.model";
import { householdTypeAdapter, regionAdapter } from "./household.adapter";
import { HouseholdActions, RegionActions } from "./household.action";

export const householdKeyName = 'household';
export const regionKeyName = 'region';

export interface State {
  loading: boolean;
  error: any;
  loaded: boolean;
  households: DropDown[]
  region: DropDown[]
}

export const initialState = householdTypeAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export const householdTypeReducer = createReducer(
  initialState,
  on(HouseholdActions.loadHouseholdType, state => ({ ...state, loading: true })),
  on(HouseholdActions.loadHouseholdTypeSuccess, (state, { households }) =>
   ({households, ...state, loading: false, loaded: true })
  ),
  on(HouseholdActions.loadHouseholdTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

export const initialStateRegion = regionAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export const regionReducer = createReducer(
  initialStateRegion,
  on(RegionActions.loadRegion, state => ({ ...state, loading: true })),
  on(RegionActions.loadRegionSuccess, (state, { region }) =>
   ({ region,...state, loading: false, loaded: true })
  ),
  on(RegionActions.loadRegionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
