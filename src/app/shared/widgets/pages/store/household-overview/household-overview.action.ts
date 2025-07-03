import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FilterPayload, HouseholdOverview } from "../../common/household.model";

export const HouseholdOverviewActions = createActionGroup({
  source: 'Household overview API',
  events: {
    'Load Household overview': props<{payload:FilterPayload}>(),
    'Load Household overview Success': props<{ overview: HouseholdOverview }>(),
    'Load Household overview Failure': props<{ error: any }>(),
  }
});