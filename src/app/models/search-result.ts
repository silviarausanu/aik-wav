import { FacetCategory } from "./facet-category";

export interface SearchResult {
    facets: FacetCategory[],
    results: {[key: string]: any}[],
    total: number   
}