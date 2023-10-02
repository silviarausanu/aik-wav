import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SearchFacetComponent } from './components/search-facet/search-facet.component';
import { PropcasePipe } from './pipes/propcase.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PopupOnClickComponent } from './components/popup-on-click/popup-on-click.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AssetsComponent,
    DashboardComponent,
    SearchBoxComponent,
    DetailsComponent,
    SearchFiltersComponent,
    SearchFacetComponent,
    PropcasePipe,
    PopupOnClickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    MatSliderModule
  ],
  providers: [TitleCasePipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
