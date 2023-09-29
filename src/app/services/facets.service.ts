import { Injectable } from '@angular/core';
import { FacetCategory } from '../models/facet-category';

@Injectable({
  providedIn: 'root'
})
export class FacetsService {

  constructor() { }

  getFacetCategory(category: string, facets?: FacetCategory[]) {
    if (!!facets && Array.isArray(facets)) {
      const matchedCategory = facets.find((fc: FacetCategory) => fc.name === category);
      const facetCategoryItems = !!matchedCategory ? matchedCategory.values : [];
      return facetCategoryItems;
    }
    return [];
  }
}
