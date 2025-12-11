import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { IconFlecha } from '../../icons/icon-flecha/icon-flecha';
import { CommonModule } from '@angular/common';
import { ButtonAside } from '../buttonAside/buttonAside';


@Component({
  selector: 'app-aside',
  imports: [IconFlecha, CommonModule],
  templateUrl: './aside.html',
})
export class Aside {
  isOpen=true

  @ContentChildren(ButtonAside) buttons!: QueryList<ButtonAside>;

  handleClick(){
    this.isOpen=!this.isOpen

    this.buttons.forEach(button => button.isOpen = this.isOpen);
  }
}
