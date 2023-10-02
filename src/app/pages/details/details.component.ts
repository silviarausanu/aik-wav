import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LngLatLike } from 'maplibre-gl';
import { CHART_CONFIG } from 'src/app/config/chart.config';
import { DataService } from 'src/app/services/data.service';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  readonly CONFIG = CHART_CONFIG;

  id!: string;
  item!: {[key: string]: any};
  official: GeoJSON.LineString = {
    type: 'LineString',
    coordinates: []
  };

  tracked: GeoJSON.LineString = {
    type: 'LineString',
    coordinates: []
  };

  qOfficial: GeoJSON.LineString = {
    type: 'LineString',
    coordinates: []
  };

  qTracked: GeoJSON.LineString = {
    type: 'LineString',
    coordinates: []
  };

  markers: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = [];

  timeline: {start: number|undefined, end:number|undefined, qStart: number|undefined, qEnd: number|undefined} = {
    start: undefined,
    end: undefined,
    qStart: undefined,
    qEnd: undefined
  }

  recordings: any[] = [];

  center:LngLatLike = [78.8718, 21.7679];

  startFilter!: number;
  endFilter!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private geoService: GeoService,
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']

      this.dataService.get(this.id).then((asset: { [key: string]: any; }) => {
        this.item = asset;
        if (this.item) {
          if(this.item.type !== 'tracker'){
            this.dataService.getPaths(this.id).then(path => {
              this.timeline.end = path.end.getTime();
              this.timeline.start = path.start.getTime();
              this.timeline.qEnd = path.end.getTime();
              this.timeline.qStart = path.start.getTime();

              this.setup(path);
            })
            this.center = this.item.position;
          } else {
            this.center = this.item.position;
            this.markers.push({
              type: "Feature",
              geometry: {
                type: 'Point',
                coordinates: this.item.position
              },
              properties: {
                iconType: this.item.icon
              }
            });

            this.recordings = [ ...Array(10) ].map((x, i) => {
              return {
                timestamp: this.dataService.generateRandomDate(),
                wav: `${i%4 + 1}.wav`
              }
            })
            this.recordings.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
          }




        }
      });


    });
  }

  setup(path: {official: number[][], actual: number[][], start: Date,end: Date}) {
    this.official.coordinates = path.official;
    this.tracked.coordinates = path.actual;

    this.markers = [];

    this.markers.push({
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: path.actual[0]
      },
      properties: {
        iconType: 'start'
      }
    });

    this.markers.push({
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: path.actual[path.actual.length - 1]
      },
      properties: {
        iconType: this.item.icon
      }
    });

    this.recordings = [ ...Array(path.actual.length) ].map((x, i) => {
      return {
        timestamp: this.dataService.generateRandomDate(path.start, path.end),
        wav: `${i%4 + 1}.wav`
      }
    })
    this.recordings.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
    
  }


  displayDate(value: number) {
    const date = new Date(value);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  display(prop: string, value: any) {
    if(Array.isArray(value)) {
      return value.map(v => this.sDisplay(v)).join('<br>');
    } else {
      return this.sDisplay(value);
    }
  }

  sDisplay(v: string) {
    if(typeof v === 'string' && v.startsWith('http')) {
      return `<a href="${v}" target="_blank" class="px-1"> <i class="fas fa-external-link-alt"></i></a>`
    } else {
      return v;
    }
  }

  timelineFilter(event: any) {
    this.dataService.getPaths(this.id, new Date(this.timeline.qStart!), new Date(this.timeline.qEnd!)).then(path => {
      this.setup(path);
    })
  }



}
