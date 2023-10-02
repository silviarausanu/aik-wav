import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacetCategory } from 'src/app/models/facet-category';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

  @Input()
  facets: FacetCategory[] = [];
 
  @Output()
  filtered: EventEmitter<string[]> = new EventEmitter<string[]>();

  onFilter(items: string[]){
    this.filtered.emit(items);
  }
}
