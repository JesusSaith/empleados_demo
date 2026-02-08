// src/app/pipes/filtro-global.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGlobal',
  standalone: true
})
export class FiltroGlobalPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    const term = searchText.toLowerCase();
    
    return items.filter(item => 
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}