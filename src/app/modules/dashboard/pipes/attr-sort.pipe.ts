import { Pipe, PipeTransform } from '@angular/core';
import {AttrObj, EsAttrValue} from "@modules/dashboard/types";

@Pipe({
  name: 'attrSort'
})
export class AttrSortPipe implements PipeTransform {

  transform(attrs: EsAttrValue): AttrObj[] {
    return Object.values(attrs).sort((a, b) => a.name.localeCompare(b.name));
  }

}
