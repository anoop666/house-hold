import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-with-arrows',
  imports: [NgClass],
  templateUrl: './dropdown-with-arrows.html',
  styleUrl: './dropdown-with-arrows.scss',
})
export class DropdownWithArrows {
  public expandDropdown: boolean = false;

  constructor(private elementRef: ElementRef) {}

  showDropdown() {
    this.expandDropdown = !this.expandDropdown;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.expandDropdown
    ) {
      this.expandDropdown = false;
    }
  }
}
