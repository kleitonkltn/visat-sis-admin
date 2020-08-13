import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CNPJandCPF'
})
export class CNPJandCPFPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const parsed = value.replace(/([^0-9])/g, '');
    if (parsed.length > 11) {
      return parsed.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5')
    } else {
      return parsed.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4')
    }
  }
}
