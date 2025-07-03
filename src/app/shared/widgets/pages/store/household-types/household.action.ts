import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { DropDown } from "../../common/household.model";

export const HouseholdActions = createActionGroup({
  source: 'Household API',
  events: {
    'Load Household Type': props<{payload:any}>,
    'Load Household Type Success': props<{ households: DropDown[] }>(),
    'Load Household Type Failure': props<{ error: any }>(),
  }
});

export const RegionActions = createActionGroup({
  source: 'Region API',
  events: {
    'Load Region': emptyProps(),
    'Load Region Success': props<{ region: DropDown[] }>(),
    'Load Region Failure': props<{ error: any }>(),
  }
});