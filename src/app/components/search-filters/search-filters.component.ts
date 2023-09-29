import { Component } from '@angular/core';
import { FacetCategory } from 'src/app/models/facet-category';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

  facets: FacetCategory[] = [
    { name: 'types', values: [
      {value:'ship', count: 100, label: 'Ships', $selected: true},
      {value:'mammal', count: 50, label: 'Mammals', $selected: true},
      {value:'device', count: 10, label: 'Devices', $selected: true},
      //{value: 'recording', count: 150, label: 'Recordings', $selected: false}
    ]}
  ]

}
