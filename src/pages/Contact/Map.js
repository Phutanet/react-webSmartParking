import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import BuildingAPI from '../../jsons/buildings.json'


function Map() {
  const firstRender = useRef(true)
  const center = { lat: 14.076691074357981, lng: 100.60166081310356 }
  const ZOOM_LEVEL = 15
  const mapRef = useRef()

  const myMarker = new L.Icon({
    iconUrl: require("./icons/nectec-icon-marker.jpg"),
    iconSize: [30,25],
  })

  useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;

      axios.get('/smartparking/api/info/building/all')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, []);

  // const myMarker = L.divIcon({
  //   className:'custom-marker',
  //   html:`<img src='${process.env.PUBLIC_URL}/images/nectec-icon.jpg'/>`
  // });

  return (
    <MapContainer 
    style={{height:"600px", width:"90%"}}
    center={center} 
    zoom={ZOOM_LEVEL} 
    // zoomControl={false}
    ref={mapRef}
    >
      <TileLayer
      url='https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=YpSw9luP70B4cQcamMIZ'
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">
      &copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">
      &copy; OpenStreetMap contributors</a>'
      />

      {BuildingAPI.map((building, index) => (
              <Marker
              position={[building.lat, building.lng]}
              icon={myMarker}
              key={index}
              >
                <Popup>
                  <b>{building.name}</b>
                </Popup>
              </Marker>
      ))}

    </MapContainer>
  )
}

export default Map