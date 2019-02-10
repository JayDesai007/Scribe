import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value:string, args?: any): any {
    let firstc=value.substring(0,1);
    let restc=value.substring(1,value.length);

    let newstr=firstc.toUpperCase()+restc.toLowerCase();

    return newstr;
  }

}
