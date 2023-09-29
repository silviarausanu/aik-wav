import { Injectable } from '@angular/core';
import { Map } from 'maplibre-gl';
/*
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import View from 'ol/View';
import { OSM, Vector } from 'ol/source';
import { MultiLineString, Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import { transform } from 'ol/proj';
import { ATTRIBUTION } from 'ol/source/OSM';*/


@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  generatePoints(count: number, xmin: number, xmax: number, ymin: number, ymax: number) {
    const points=[];
    for (let i = 0; i < count; i++) {
      var xx = Math.random() * (xmax - xmin) + xmin;
      var yy = Math.random() * (ymax - ymin) + ymin;
      points.push([xx, yy]);
    }

    return points;
  }

  generateEastIndia(count: number = 10){
    return this.generatePoints(count, 85, 95, 11.3, 19.7);
  }

  generateSouthEastIndia(count: number = 10){
    return this.generatePoints(count, 80, 95, -5, 13);
  }

  generateSouthWestIndia(count: number = 10){
    return this.generatePoints(count, 49, 75, -13, 11.7);
  }

  generateWestIndia(count: number = 10){
    return this.generatePoints(count, 60, 69, 8, 25);

  }

  generateRandomPoints(count: number = 10): number[][] {
    return this.generatePoints(count, 84, 95, 13, 21);
  }

  generatePoint(asset:  {[key: string]: any}, point: number[], index: number): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> {
    return {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: point
      },
      id: index,
      properties: {
        asset: asset,
        iconType: asset.icon
      }
    }
  }



  plotPoints(map: Map,  points: number[][], type: string) {
    map.loadImage(`assets/icons/${type}.png`, (error, image) => {
      if(!!image) {
        const sourceId = `${type}-id`;
        map
          .addImage(type, image!)
          .addSource(sourceId, {
            type: 'geojson',
            data: this.createLayer(points, type)
          })
          .addLayer({
            'id': sourceId+'1',
            'type': 'symbol',
            'source': sourceId,
            'layout': {
              'icon-image': ['concat', 'icon-', ['get', 'type']]
            }
          })
      }

    });
  }

  createLayer(points: number[][], type: string) {
    const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = {
      type: 'FeatureCollection',
      features: points.map((point: number[], index: number) => {
        return {
          type: 'Feature',
          properties: {
            description: `<strong>${index}</strong> point`,
            type: type
          },
          geometry: {
            type: 'Point',
            coordinates: point.reverse()
          }
        }
      })
    }
  }

/*
  createMap(target: string = 'map', long: number = 21.7679, lat: number = 78.8718): Map {
    const openMapLayer = new TileLayer({
      source: new OSM(),
    });

    const openSeaMapLayer = new TileLayer({
      source: new OSM({
        attributions: [
          'All maps © <a href="https://www.openseamap.org/">OpenSeaMap</a>',
          ATTRIBUTION,
        ],
        opaque: false,
        //url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        url: 'https://t2.openseamap.org/tile/{z}/{x}/{y}.png'
      }),
    });
    return new Map({
      layers: [openSeaMapLayer],
      target: target,
      view: new View({
        center: this.transform(lat, long),
        zoom: 5, maxZoom: 18,
      }),
    });
  }

  plotPoints(map: Map, points: number[][], type: string | undefined) {
    const vectorSourcePoints = new Vector({});
    map.addLayer(new VectorLayer({source: vectorSourcePoints, style: this.getPointStyle(type)}) );
    points.filter((coord: number[]) => coord.length === 2).forEach((coord: number[]) => {
      const point = new Point([coord[0], coord[1]]).transform('EPSG:4326', 'EPSG:3857');
      var feature = new Feature({geometry:point});
      vectorSourcePoints.addFeature(feature);
    })
  }

  plotLines(map: Map, points: number[][], color = 'red') {
    const vectorSourceLines = new Vector({});
    map.addLayer(new VectorLayer({source: vectorSourceLines, style: this.getLineStyle(color)}));
    const coords = points.filter((coord: number[]) => coord.length === 2).map((coord: number[]) => {
      return this.transform(coord[0], coord[1]);
    });

    const line = new MultiLineString([coords]);
    var featurething = new Feature({
      geometry: line
    });
    vectorSourceLines.addFeature( featurething );
  }

  getLineStyle(color: string = 'red') {
    return new Style({
      stroke: new Stroke({
        color: color,
        width: 1
      })
    })
  }


  getPointStyle(type: string | undefined): Style {
    return !!type ? this.getImageStyle(type) : this.getCircleStyle();
  }

  private getCircleStyle() {
    return  new Style({
      image: new CircleStyle({
        radius: 4,
        fill: new Fill({ color: 'rgba(0, 0, 0, 0.8)' }),
        stroke: new Stroke({ color: '#f8bc09', width: 2 }),
      })
    })
  }

  private getImageStyle(type: string) {
    return new Style({
      image: new Icon({
        anchor: [1, 1],
        src: `assets/icons/${type}.svg`,
      })
    });
  }


  getTextStyle(feature: Feature) {
    return new Text({
      font: '14px Calibri,sans-serif',
      text: feature.get('name'),
      stroke: new Stroke({
        color: 'black',
        width: 3
      }),
      fill: new Fill({ color: 'white' }),
      offsetX: 0,
      offsetY: 0,
    })
  }



  transform(long: number, lat: number) {
    return transform([long,lat],'EPSG:4326', 'EPSG:3857');
  }*/



}
