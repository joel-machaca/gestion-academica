import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatoFecha',
})
export class FormatoFechaPipe implements PipeTransform {

  transform(fecha: string): string {  
    return new Date(fecha).toLocaleDateString('es-ES', {  
      day: '2-digit',  
      month: '2-digit',  
      year: 'numeric'  
    });  
  } 

}
