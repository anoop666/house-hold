import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-distribution-with-progress',
  imports: [],
  templateUrl: './value-distribution-with-progress.html',
  styleUrl: './value-distribution-with-progress.scss'
})
export class ValueDistributionWithProgress {
  @Input() widthProgress:string = '25%';
  @Input() boldValue:string = '256,234';
  @Input() range:string = '0-<4000';
  @Input() percentage:string = '25%';

}
