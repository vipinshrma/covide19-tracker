import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import { tileLayer } from 'leaflet'
import '../styles/Map.css';
import {showDataOnMap} from '../Utils.js/SortedData';

export default function Map({countries, casesType,center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {showDataOnMap(countries,casesType)}

            </LeafletMap>
            
        </div>
    )
}
