import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelAccessPipe'
})
export class LevelAccessPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'ADMIN':
        return 'MASTER'
      case 'SUPERVISOR':
        return 'Administrador'
      case 'PUBLIC':
        return 'Visitante'
    }
  }
}
