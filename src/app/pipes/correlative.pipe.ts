import { Pipe, PipeTransform } from '@angular/core';
import { DatabaseService } from '../core/database.service';

@Pipe({
  name: 'correlative'
})
export class CorrelativePipe implements PipeTransform {

  constructor(
    public dbs : DatabaseService,
  ) {}

  transform(value: any, args?: any): any {
    let corr = value+"";
    while(corr.length < this.dbs.documentConfig['correlativeLength']){
      corr = "0" + corr;
    }
    return corr;
  }

}
