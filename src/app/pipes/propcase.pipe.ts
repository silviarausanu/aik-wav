import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propcase'
})
export class PropcasePipe implements PipeTransform {

  constructor(
    private titlePipe: TitleCasePipe
  ) {}

  transform(value: string | undefined): string | undefined{
    if(!!value) {
      const pieces = value.split('_');
      return pieces.map(p => this.titlePipe.transform(p)).join(' ');
    }
    return value;
  }

}
