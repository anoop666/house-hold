import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dwelling-tile',
  imports: [NgClass],
  templateUrl: './dwelling-tile.html',
  styleUrl: './dwelling-tile.scss'
})
export class DwellingTile {
  @Input() imgIcon:string = 'apartment-icon.svg';
  @Input() tileHead:string = 'Apartment';
  @Input() tileValue:string = '0';
  @Input() tilepercentage:string = '0%';
  @Input() currentProgress:string = '25%';
  @Input() vechicles:boolean = true;
}
