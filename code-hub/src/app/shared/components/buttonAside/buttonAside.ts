import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-button-aside',
  imports: [RouterModule, CommonModule],
  template: `<a [routerLink]="ruta"
                class="flex items-center px-3 py-3 hover:bg-red-700/30 rounded-md">
                <ng-content/>
              <span [ngClass]="isOpen? 'ml-3':'hidden'">{{text}}</span>
              </a>`,
})
export class ButtonAside {
  @Input() text=""
  @Input() ruta=""
  @Input() isOpen=true

}
