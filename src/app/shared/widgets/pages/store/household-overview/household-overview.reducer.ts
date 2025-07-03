import { createReducer, on } from "@ngrx/store";
import { HouseholdOverview } from "../../common/household.model";
import { householdOverviewAdapter } from "./household-overview.adapter";
import { HouseholdOverviewActions } from "./household-overview.action";


export const householdOverviewKeyName = 'householdOverview';

export interface overviewState {
  loading: boolean;
  error: any;
  loaded: boolean;
  overview: HouseholdOverview;
}

export const initialState = householdOverviewAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export const householdOverviewReducer = createReducer(
  initialState,
  on(HouseholdOverviewActions.loadHouseholdOverview, state => ({ ...state, loading: true })),
  on(HouseholdOverviewActions.loadHouseholdOverviewSuccess, (state, { overview }) =>
  ({overview, ...state, loading: false, loaded: true })
  ),
  on(HouseholdOverviewActions.loadHouseholdOverviewFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
