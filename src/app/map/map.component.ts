import { UrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');
//import * as MapboxDirections from 'mapbox-gl-directions/src';
// import MapboxDirections from 'mapbox-gl-directions/src/directions';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 20.2961;
  lng = 85.8245;
  zoom = 1;


  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.buildMap();
  }

  buildMap() {

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })

  var directions = new MapboxDirections({
    accessToken: environment.mapbox.accessToken,
    unit: 'metric',
    profile: 'mapbox/cycling'
  });

  this.map.addControl(new mapboxgl.NavigationControl());
  this.map.addControl(new mapboxgl.FullscreenControl());
  this.map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
  this.map.addControl(directions,'top-left');
  this.map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );

  }
}
