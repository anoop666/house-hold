import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-distribution',
  imports: [],
  templateUrl: './value-distribution.html',
  styleUrl: './value-distribution.scss'
})
export class ValueDistribution {
  @Input() boldValue:string = '256,234';
  @Input() range:string = '0-<4000';
  @Input() percentage:string = '25%';
}
