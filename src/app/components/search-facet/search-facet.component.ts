import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Facet } from 'src/app/models/facet';
import { FacetCategory } from 'src/app/models/facet-category';
import { FacetsService } from 'src/app/services/facets.service';

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.scss']
})
export class SearchFacetComponent {

  @Input()
  public category!: string;

  @Input()
  facets: FacetCategory[] | undefined;

  @Output()
  filtered: EventEmitter<string[]> = new EventEmitter<string[]>();

  items: Facet[] | undefined;

  constructor(
    private facetService: FacetsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['facets'] || changes['category']) {
      this.handleFacetCategory();
    }
  }

  private handleFacetCategory(): void {
    this.items = this.facetService.getFacetCategory(this.category, this.facets);
  }

  filter(item: Facet, event: any) {
    item.$selected = !item.$selected;
    this.filtered.emit(this.items?.filter(i => i.$selected).map(i => i.value));
  }


}
