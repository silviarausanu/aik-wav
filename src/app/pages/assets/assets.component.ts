import { Component } from '@angular/core';
import { FacetCategory } from 'src/app/models/facet-category';
import { DataService } from 'src/app/services/data.service';

// https://spatialillusions.com/milsymbol/docs/milsymbol-2525d.html - svg sources
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {


  items: any[] = [];
  facets: FacetCategory[] = [];

  query: string = ''

  constructor(
    private dataService: DataService
  ){
    this.search('', []);
  }

  onQuery(text: string) {
    this.query = text;
    this.search(text, []);
  }

  onFilter(filters: string[]) {
    this.search(this.query, filters);
  }



  private search(query: string, filters: string[]) {
    this.dataService.search(query, filters).then((re) => {
      this.items = re.results;
      this.facets = re.facets;
    });
  }


}
