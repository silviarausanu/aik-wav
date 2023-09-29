import { Component, QueryList, ViewChildren } from '@angular/core';
import { MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { Map } from 'maplibre-gl';
import { CHART_CONFIG } from 'src/app/config/chart.config';
import { DataService } from 'src/app/services/data.service';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  readonly CONFIG = CHART_CONFIG;

  constructor(
    private geoService: GeoService,
    private dataService: DataService
  ){ }

  public map!: Map;

  features: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[]  = [];


  ngOnInit(): void {
    this.dataService.getAssets().then((assets: {[key: string]: any}[]) => {
      assets.filter(a => !!a.position).forEach((a, index: number) => {
        this.features.push(this.geoService.generatePoint(a, a.position || this.geoService.generateRandomPoints(1)[0], index))
      })
    })
  }



  mapLoaded(event: Map) {
    this.map = event;
  }





  @ViewChildren('marker') markers!: QueryList<MarkerComponent>;
  selectedMarker: GeoJSON.Feature<GeoJSON.Point> | undefined | null = undefined;
  selectedMarkerIndex: number | undefined = undefined

  onClick(what: GeoJSON.Feature<GeoJSON.Point> | undefined | null, index: number | undefined) {
    if(index !== undefined && !!what) {
      this.selectedMarker = what;
      this.selectedMarkerIndex = index;
    } else {
      this.selectedMarker = undefined;
      this.selectedMarkerIndex = undefined;
    }
  }


  getSelectedMarker() {
    return !!this.selectedMarker && this.selectedMarkerIndex !== undefined && !!this.markers && this.markers.length > (this.selectedMarkerIndex) ?
      this.markers.get(this.selectedMarkerIndex) : undefined ;
  }

  get asset() {
    return this.selectedMarker?.properties?.asset;
  }

}
