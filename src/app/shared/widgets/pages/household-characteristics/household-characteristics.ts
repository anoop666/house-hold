import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Filter } from '../../organisms/filter/filter';
import { ProgressBar } from '../../molecules/progress-bar/progress-bar';
import { HalfDonutChart } from "../../organisms/half-donut-chart/half-donut-chart";
import { BarChart, HorizontalBarDatum } from "../../organisms/bar-chart/bar-chart";
import { FullDonutChart } from "../../organisms/full-donut-chart/full-donut-chart";
import { GroupedBarChart } from "../../organisms/grouped-bar-chart/grouped-bar-chart";
import { RadialMultiGaugeComponent } from "../../organisms/radial-multi-gauge/radial-multi-gauge";
import { BarLineChart } from "../../organisms/bar-line-chart/bar-line-chart";
import { StackedBarChart } from "../../organisms/stacked-bar-chart/stacked-bar-chart";
import { TornadoChart } from "../../organisms/tornado-chart/tornado-chart";
import { MultiDonutChart } from "../../organisms/multi-donut-chart/multi-donut-chart";
import { DwellingTile } from "../../organisms/dwelling-tile/dwelling-tile";
import { ValueDistribution } from "../../organisms/value-distribution/value-distribution";
import { ValueDistributionWithProgress } from "../../organisms/value-distribution-with-progress/value-distribution-with-progress";
import { DropDown, HouseholdOverview } from '../common/household.model';
import { HouseholdOverviewActions } from '../store/household-overview/household-overview.action';
import { selectHouseHoldOverview } from '../store/household-overview/household-overview.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-household-characteristics',
  imports: [NgClass, Filter, ProgressBar, HalfDonutChart, BarChart, FullDonutChart, GroupedBarChart, RadialMultiGaugeComponent, BarLineChart, StackedBarChart, TornadoChart, MultiDonutChart, DwellingTile, ValueDistribution, ValueDistributionWithProgress],
  templateUrl: './household-characteristics.html',
  styleUrl: './household-characteristics.scss',
  providers:[]
})
export class HouseholdCharacteristics {
  public expandBottom: boolean = false;
  public overlayEmirate: boolean = false;
  public overlayNonEmirate: boolean = false;
  public fixedBtn: boolean = false;
  currentSlide = 0;
  slidesToShow = 4;

  tiles = [
    { title: 'Dwelling Type 1', content: 'Content for tile 1' },
    { title: 'Dwelling Type 2', content: 'Content for tile 2' },
    { title: 'Dwelling Type 3', content: 'Content for tile 3' },
    { title: 'Dwelling Type 4', content: 'Content for tile 4' },
    { title: 'Dwelling Type 5', content: 'Content for tile 5' },
    { title: 'Dwelling Type 6', content: 'Content for tile 6' },
    { title: 'Dwelling Type 7', content: 'Content for tile 7' },
    { title: 'Dwelling Type 8', content: 'Content for tile 8' },
    { title: 'Dwelling Type 9', content: 'Content for tile 9' },
    { title: 'Dwelling Type 10', content: 'Content for tile 10' },
    { title: 'Dwelling Type 11', content: 'Content for tile 11' },
    { title: 'Dwelling Type 12', content: 'Content for tile 12' },
    { title: 'Dwelling Type 13', content: 'Content for tile 13' },
  ];

 chartData: HorizontalBarDatum[] = [
   { label: 'Connected to Public net', value: 512_822, color: '#4ec18d' },
    { label: 'Private well',            value: 288,     color: '#ffa500' },
    { label: 'Tankers',                 value: 1_755,   color: '#a678f6' },
    { label: 'Bottled water',           value: 6_775,   color: '#00bcd4' },
  ];

  householdData = [
  { name: '1 - 3', value: 217510, percentage: 6, color: '#1f77b4' },
  { name: '4 - 6', value: 360233, percentage: 17, color: '#ff7f0e' },
  { name: '7 - 10', value: 576192, percentage: 24, color: '#ffcf00' },
  { name: '11 - 15', value: 921134, percentage: 32, color: '#6a51a3' },
  { name: '+ 16', value: 1322441, percentage: 35, color: '#17becf' }
];

categories = ['1 - 3', '4 - 7', '8 - 14', '15+'];
seriesData = [
  {
    name: 'Employment',
    data: [100, 50, 90, 95],
    color: '#00BFFF'
  },
  {
    name: 'Self Production',
    data: [40, 100, 45, 40],
    color: '#FFA500'
  },
  {
    name: 'Transfers',
    data: [30, 40, 70, 80],
    color: '#90EE90'
  },
  {
    name: 'Rental Property income',
    data: [20, 25, 50, 55],
    color: '#66CDAA'
  }
];

housingData = [
  { name: 'Normal Rent',          value: 136070, color: '#f79d1c' },
  { name: 'Provided by work',     value: 62300,  color: '#2c79b8' },
  { name: 'Own',                  value: 36000,  color: '#9bd0cb' },
  { name: 'Work advantage',       value: 11200,  color: '#3699ec' },
  { name: 'Free accommodation',   value:  9770,  color: '#6dc8ff' },
  { name: 'Owned by Father/Mother', value: 4850, color: '#1f5ca7' },
  { name: 'Furnished Rent',       value:  4850,  color: '#b098ff' }
];

multiDonutChartData = [
  {
    name: 'Connected to Public net',
    value: 41000,
    color: '#5DC8CD' // greenish
  },
  {
    name: 'Private well',
    value: 123,
    color: '#FFA500' // orange
  },
  {
    name: 'Tankers',
    value: 1437,
    color: '#9B51E0' // purple
  },
  {
    name: 'Bottled water',
    value: 546173,
    color: '#1DA1F2' // blue
  }
]

  public householdOverview!: HouseholdOverview;
  constructor(private store: Store, private cdr:ChangeDetectorRef){}

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
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
        });
      }

  checkScreenSize() {
    if (window.innerWidth <= 768) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 4;
    }
    const maxSlide = Math.max(0, this.tiles.length - this.slidesToShow);
    this.currentSlide = Math.min(this.currentSlide, maxSlide);
  }

  slide(direction: number) {
    const newSlide = this.currentSlide + direction;
    const maxSlide = Math.max(0, this.tiles.length - this.slidesToShow);

    if (newSlide >= 0 && newSlide <= maxSlide) {
      this.currentSlide = newSlide;
    }
  }

  toggleExpand() {
    this.expandBottom = !this.expandBottom;
  }

  emirateOverlayClick() {
    this.overlayEmirate = !this.overlayEmirate;
    this.fixedBtn = !this.fixedBtn;
    this.overlayNonEmirate = false;
  }

  nonEmirateOverlayClick() {
    this.overlayNonEmirate = !this.overlayNonEmirate;
    this.fixedBtn = !this.fixedBtn;
    this.overlayEmirate = false;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.checkScreenSize());
  }
}
