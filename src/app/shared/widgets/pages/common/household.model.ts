export interface DropDown {
    value:string;
    selected:boolean;
}

export interface HouseholdOverview {
  emirati: Emirati[]
  nonEmirati: NonEmirati[]
  total: Total[]
}

export interface Emirati {
  totalHouseholds: number
  averageHouseholdSize: number
  percentage: number
}

export interface NonEmirati {
  totalHouseholds: number
  averageHouseholdSize: number
  percentage: number
}

export interface Total {
  totalHouseholds: number
  averageHouseholdSize: number
}

export interface FilterPayload {
  regions: string[]
  householdTypes: string[]
  dwellingTypes: string[]
}