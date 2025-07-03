import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../../organisms/header/header';
import { HouseholdCharacteristics } from '../household-characteristics/household-characteristics';
import { trigger, transition, style, animate } from '@angular/animations';
import { DropdownWithArrows } from '../../atoms/dropdown-with-arrows/dropdown-with-arrows';
import { Store } from '@ngrx/store';
import { HouseholdActions, RegionActions } from '../store/household-types/household.action';
import { DropDown, FilterPayload, HouseholdOverview } from '../common/household.model';
import { selectHouseHold, selectRegionResponse } from '../store/household-types/household.selectors';
import { HouseholdOverviewActions } from '../store/household-overview/household-overview.action';
import { selectHouseHoldOverview } from '../store/household-overview/household-overview.selectors';
import { DonutChartComponent } from "../../organisms/donut-chart/donut-chart.component";

@Component({
  selector: 'app-home-page',
  imports: [Header, HouseholdCharacteristics, DropdownWithArrows, DonutChartComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  animations: [
    trigger('slideVertical', [
      transition(
        'void => enter',
        [
          style({ transform: 'translateY({{ enterFrom }})', opacity: 0 }),
          animate(
            '400ms ease',
            style({ transform: 'translateY(0%)', opacity: 1 })
          ),
        ],
        { params: { enterFrom: '100%' } }
      ),

      transition(
        'void => leave',
        [
          animate(
            '400ms ease',
            style({ transform: 'translateY({{ leaveTo }})', opacity: 0 })
          ),
        ],
        { params: { leaveTo: '-100%' } }
      ),
    ]),
  ],
})
export class HomePage implements OnInit {
  currentSlide = 0;
  previousSlide = 0;
  scrollCooldown = false;
  private touchStartY = 0;
  private touchEndY = 0;
  private swipeCooldown = false;

  animationParams = {
    enterFrom: '100%',
    leaveTo: '-100%',
  };

  slides = [
    {
      component: 'home',
      labelLine1: 'Floor #1',
      labelLine2: 'Households 2024',
    },
    {
      component: 'household',
      labelLine1: 'Floor #2',
      labelLine2: 'Demographics',
    },
    {
      component: 'another',
      labelLine1: 'Floor #3',
      labelLine2: 'Income and Expenditure',
    },
  ];

  houseHoldTypes: DropDown[] = [];
  regions: DropDown[] = [];
  donutData = {
    totalVal: 10,
    data: [
      {
        name: "emirati",
        color: "#E8C97A",
        value: 10
      },
      {
        name: "nonemirati",
        color: "#748267",
        value: 10
      }
    ]
  };
  public householdOverview!: HouseholdOverview;

  constructor(private store: Store, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getHouseHoldtypes();
    this.getHouseHoldOverview();
    this.getRegions();
  }

  getHouseHoldtypes() {
  this.store.dispatch(HouseholdActions.loadHouseholdType());
  this.store
    .select(selectHouseHold)
    .pipe()
    .subscribe((state) => {
      this.houseHoldTypes = state?.households;
      console.log(this.houseHoldTypes);
    });
}


  getHouseHoldOverview() {
    let filter:any = {}
    this.store.dispatch(HouseholdOverviewActions.loadHouseholdOverview(filter));
    this.store
      .select(selectHouseHoldOverview)
      .pipe()
      .subscribe((data) => {
        this.householdOverview = data?.overview;
        this.cdr.detectChanges();
        if(this.householdOverview?.total){
        this.setChartValues(data?.overview)
        }
      });
    }
    getRegions(){
    this.store.dispatch(RegionActions.loadRegion())
    this.store.select(selectRegionResponse).pipe().subscribe(data=>{
      this.regions=data?.region;
    })
  }

  setChartValues(householdOverview:HouseholdOverview){
    this.donutData.totalVal = householdOverview?.total?.[0]?.totalHouseholds;
    this.donutData.data[0].value = householdOverview?.emirati?.[0]?.totalHouseholds
    this.donutData.data[1].value = householdOverview?.nonEmirati?.[0]?.totalHouseholds
    this.donutData = {...this.donutData}
    this.cdr.detectChanges();
  }

  onScroll(event: WheelEvent): void {
    if (this.scrollCooldown) return;

    this.scrollCooldown = true;

    const direction = event.deltaY > 0 ? 'down' : 'up';

    if (direction === 'down' && this.currentSlide < this.slides.length - 1) {
      this.goToSlide(this.currentSlide + 1);
    } else if (direction === 'up' && this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }

    // Add a short cooldown to prevent overscroll
    setTimeout(() => {
      this.scrollCooldown = false;
    }, 600); // adjust duration to match your animation
  }

  goToSlide(index: number): void {
    if (index === this.currentSlide) return;

    const goingForward = index > this.currentSlide;

    this.previousSlide = this.currentSlide;
    this.currentSlide = index;

    this.animationParams = {
      enterFrom: goingForward ? '100%' : '-100%',
      leaveTo: goingForward ? '-100%' : '100%',
    };
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    if (this.swipeCooldown) return;

    const deltaY = this.touchStartY - this.touchEndY;

    if (Math.abs(deltaY) > 40) {
      this.swipeCooldown = true;

      if (deltaY > 0 && this.currentSlide < this.slides.length - 1) {
        // Swipe up → go to next slide
        this.goToSlide(this.currentSlide + 1);
      } else if (deltaY < 0 && this.currentSlide > 0) {
        // Swipe down → go to previous slide
        this.goToSlide(this.currentSlide - 1);
      }

      setTimeout(() => {
        this.swipeCooldown = false;
      }, 600); // Match slide animation duration
    }
  }
}
