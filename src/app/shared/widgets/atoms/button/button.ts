import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() btnLabel!: string;
  @Input() btnClass!: string;
  @Input() btnDisabled: boolean = false;
  @Output() btnClick = new EventEmitter<MouseEvent>();

  btnClicked(event: MouseEvent) {
    this.btnClick.emit(event);
  }
}
