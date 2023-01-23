import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const center = [14.076691074357981, 100.60166081310356]

function Map() {
  return (
  <MapContainer 
  style={{ height:"100%", width:"100%" }}
  center={center} 
  zoom={10} 
  scrollWheelZoom={false}
  >
    <TileLayer
    url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YpSw9luP70B4cQcamMIZ'
    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    />

  </MapContainer>

  )
}

export default Map