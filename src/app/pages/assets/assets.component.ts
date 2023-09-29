import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

// https://spatialillusions.com/milsymbol/docs/milsymbol-2525d.html - svg sources
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {


  items: any[] = [];
  constructor(
    private dataService: DataService
  ){
    this.dataService.getAssets().then((assets: {[key: string]: any}[]) => {
        this.items = assets;
    });
   }




}
