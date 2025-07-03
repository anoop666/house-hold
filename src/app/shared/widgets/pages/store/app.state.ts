import { householdOverviewKeyName, householdOverviewReducer } from "./household-overview/household-overview.reducer";
import { householdKeyName, householdTypeReducer, regionKeyName, regionReducer } from "./household-types/household.reducer";

export const appReducer = {
  [householdKeyName]: householdTypeReducer,
  [householdOverviewKeyName]: householdOverviewReducer,
  [regionKeyName]: regionReducer,
}