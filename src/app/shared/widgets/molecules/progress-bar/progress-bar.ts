import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [NgClass],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss'
})
export class ProgressBar {
  @Input() percentage: number = 0;
  @Input() align: 'left' | 'right' = 'left';
}
