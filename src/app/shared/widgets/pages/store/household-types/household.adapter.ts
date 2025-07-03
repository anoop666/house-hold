import { createEntityAdapter } from '@ngrx/entity';
import { DropDown } from '../../common/household.model';

export const householdTypeAdapter = createEntityAdapter<DropDown>({selectId:(item)=>item.value});
export const regionAdapter = createEntityAdapter<DropDown>({selectId:(item)=>item.value});