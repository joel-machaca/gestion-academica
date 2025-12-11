import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-flecha',
  imports: [CommonModule],
  templateUrl: './icon-flecha.html',
})
export class IconFlecha {
  @Input() className=""

  // @Output() accion = new EventEmitter<void>();

  
  // onClick() {
  //   this.accion.emit();
  // }
}
