import { Injectable } from '@angular/core';
import { GeoService } from './geo.service';
import { filter, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../models/search-result';
import { FacetCategory } from '../models/facet-category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private geo: GeoService,
    private http: HttpClient,
  ) {
    //this.mockPaths();
  }


  private assets: {[key: string]: any}[] = [];

  search(query: string, filter: string[]): Promise<SearchResult> {
    return new Promise((resolve) => {
      this.getAssets().then((assets:{[key: string]: any}[] ) => {
        const searchSet =  !!query && query != '' ? assets.filter(a => JSON.stringify(a).includes(query)) : assets;
        const finalSet = filter.length > 0 ? searchSet.filter(a => filter.includes(a.type)) : searchSet;
        resolve (
          {
            facets: [this.count(searchSet, 'type', filter)],
            results: finalSet,
            total: finalSet.length
          }
        )
      });
    })
  }

  private count(items:{[key: string]: any}[] , property: string, filters: string[]): FacetCategory {
    const ind: {[key: string]: number} = {};
    items.forEach((item) => {
      if (property in item) {
        const key = item[property];
        if (key in ind) {
          ind[key] = ind[key] + 1;
        } else {
          ind[key] = 1;
        }
      }
    });
    return {
      name: property,
      values: 
        Object.keys(ind).map((key) => {
          return {
            value: key,
            count: ind[key],
            label: key,
            $selected: filters.includes(key)
          }
        })
    }
  }



  getAssets():Promise< {[key: string]: any}[]> {
    return new Promise((resolve) => {
      Promise.all([
        lastValueFrom(this.http.get< {[key: string]: any}[]>('assets/data/ships.json')),
        lastValueFrom(this.http.get< {[key: string]: any}[]>('assets/data/mammals.json')),
        lastValueFrom(this.http.get< {[key: string]: any}[]>('assets/data/trackers.json')),
        lastValueFrom(this.http.get< {[key: string]: any}[]>('assets/data/paths.json')),
      ]).then((v: any[][]) => {
        this.assets = [];
        const paths = v[v.length - 1];
        v.slice(0, 3).forEach((vi: {[key: string]: any}[]) => {
          vi.forEach((i: {[key: string]: any}) => {
            if(!i.position) {
              const pp = paths.filter(p => p.item === i.uid);
              const point = !!pp && pp.length > 0 ? pp[pp.length - 1] : undefined;
              i.position = !!point ? point.position : undefined;

            }

            this.assets.push(i);
          })
        });

        resolve(this.assets);
      })
    });

  }

  getPaths(id: string, start: Date| undefined = undefined, end: Date | undefined = undefined): Promise<{official: number[][], actual: number[][], start: Date, end: Date}> {
    return new Promise((resolve) => {
      lastValueFrom(this.http.get< {[key: string]: any}[]>('assets/data/paths.json')).then(paths => {
        
        let pp = paths.filter(p => p.item === id);
        pp = !!start ? pp.filter(p => new Date(p.timestamp) >= start) : pp;
        pp = !!end ? pp.filter(p => new Date(p.timestamp) <= end) : pp;
        const official = pp.filter(p => p.type === 'official');
        const actual = pp.filter(p => p.type === 'actual')
        const times = pp.map(p => new Date(p.timestamp).getTime());
        resolve({
          official: official.map(p => p.position),
          actual: actual.map(p => p.position),
          start: new Date(Math.min(...times)),
          end: new Date(Math.max(...times))
        });
      })

    });
  }

  get(id: string): any {
    return new Promise((resolve) => {
      this.getAssets().then((assets) => {
        resolve(assets.find(i => i.uid === id));
      })
    })
  }



  path: number[][] = [
    [85.771090, 19.745055],
    [86.606956, 19.662310],
    [87.772268, 20.343661],
    [88.739697, 20.611256],
    [90.102892, 20.796239],
    [91.136282, 20.343661],
    [91.949802, 19.620922],
    [92.499477, 18.957272],
    [93.159088, 18.103108],
    [93.730751, 17.076805],
    [94.060297, 16.498735],
    [94.236193, 15.992449]
  ];

  bpath: number[][] = [
    [85.771090, 19.745055],
    [86.606956, 19.662310],
    [87.772268, 20.343661],
    [88.739697, 20.611256],
    [90.102892, 20.796239],
    [90.074607, 21.844372],
    [91.949802, 19.620922],
    [92.499477, 18.957272],
    [93.159088, 18.103108],
    [93.730751, 17.076805],
    [94.060297, 16.498735],
    [94.236193, 15.992449]
  ];

  mockPaths() {
    const d = [
      {official: this.path, actual: this.bpath, item: 'imo_9176656'}
    ];

    const paths: any[] = [];
    let pastDate = new Date('2023-09-20T00:00:00');
    d.forEach(path => {
        for(let i = 0; i<path.official.length; i++) {
          const date = this.generateRandomDate(pastDate);
          pastDate = date;
          paths.push({
            type: 'official',
            timestamp: date,
            position: path.official[i],
            item: path.item
          });
          paths.push({
            type: 'actual',
            timestamp: date,
            position: path.actual.length > i ? path.actual[i] : path.official[i],
            item: path.item
          });
        }

    });
    console.log(JSON.stringify(paths));
  }

  mockDevices() {
    const devices: any[] = [];
    [...Array(10)].forEach((o, v) => {
      devices.push({
        uid: `r_${v}`,
        type: 'tracker',
        icon: 'recorder',
        name: `AK00${101 + v}`,
        position: this.geo.generateEastIndia(1)[0]
      })
    });
    [...Array(10)].forEach((o, v) => {
      devices.push({
        uid: `r_${v+100}`,
        type: 'tracker',
        icon: 'recorder',
        name: `AK00${201 + v}`,
        position: this.geo.generateSouthEastIndia(1)[0]
      })
    });
    [...Array(10)].forEach((o, v) => {
      devices.push({
        uid: `r_${v+200}`,
        type: 'tracker',
        icon: 'recorder',
        name: `AK00${301 + v}`,
        position: this.geo.generateSouthWestIndia(1)[0]
      })
    });
    [...Array(10)].forEach((o, v) => {
      devices.push({
        uid: `r_${v+300}`,
        type: 'tracker',
        icon: 'recorder',
        name: `AK00${401 + v}`,
        position: this.geo.generateSouthWestIndia(1)[0]
      })
    });
    console.log(JSON.stringify(devices));
  }

  generateRandomDate(date: Date = new Date('2023-09-20T00:00:00'), end: Date = new Date()) {
    const random = this.getRandomDate(date, end)
    return random;
}

  getRandomDate(from: Date, to: Date) {
      const fromTime = from.getTime();
      const toTime = to.getTime();
      return new Date(fromTime + Math.random() * (toTime - fromTime));
  }





}
