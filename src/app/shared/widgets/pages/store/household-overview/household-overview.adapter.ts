import { createEntityAdapter } from '@ngrx/entity';
import { HouseholdOverview } from '../../common/household.model';

export const householdOverviewAdapter = createEntityAdapter<HouseholdOverview>();