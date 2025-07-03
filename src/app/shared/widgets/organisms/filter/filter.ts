import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Button } from '../../atoms/button/button';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { HouseholdActions, RegionActions } from '../../pages/store/household-types/household.action';
import { selectHouseHold, selectRegionResponse } from '../../pages/store/household-types/household.selectors';
import { DropDown } from '../../pages/common/household.model';

@Component({
  selector: 'app-filter',
  imports: [Button, NgClass],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter implements OnInit {
  public expandDropdown: boolean = false;
  public expandDropdownDwelling: boolean = false;
  public expandDropdownRegion: boolean = false;

  public mobileExpand: boolean = false;

   houseHoldTypes: DropDown[] = [];
  regions: DropDown[] = [];

  constructor(private store:Store,private cdr: ChangeDetectorRef){}

  ngOnInit(){
  this.getHouseHoldtypes();
  this.getRegions();
  }

  getHouseHoldtypes() {
      this.store.dispatch(HouseholdActions.loadHouseholdType());
      this.store
        .select(selectHouseHold)
        .pipe()
        .subscribe((state) => {
          this.houseHoldTypes = state?.households?.map(item=>({
            ...item,
            selected: false
          }));
        });
    }

     getRegions(){
      this.store.dispatch(RegionActions.loadRegion())
      this.store.select(selectRegionResponse).pipe().subscribe(data=>{
        this.regions=data?.region;
      })
    }

  selectedItem(item:DropDown,type:string){
   if(type==='houseHold'){
    this.houseHoldTypes.forEach(x=>{
      if(x.value===item.value){
        item.selected=!item.selected
      }
    })
    this.cdr.detectChanges();
   }
    console.log(this.houseHoldTypes)
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  mobileFilterClick(): void {
    if (this.isMobile()) {
      this.mobileExpand = !this.mobileExpand;
    }
  }

  dropdownClick() {
    this.expandDropdown = !this.expandDropdown;
    this.expandDropdownDwelling = false;
    this.expandDropdownRegion = false;
  }

   dropdownClickDwelling() {
    this.expandDropdownDwelling = !this.expandDropdownDwelling;
    this.expandDropdown = false;
    this.expandDropdownDwelling =false;
  }

 dropdownClickRegion() {
    this.expandDropdownRegion = !this.expandDropdownRegion;
    this.expandDropdownDwelling = false;
    this.expandDropdown=false
  }

}
