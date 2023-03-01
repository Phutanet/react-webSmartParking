import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'


function Map() {
  const mapRef = useRef()
  const firstRender = useRef(true)
  const [dataResponse, setDataResponse] = useState([])
  
  const myMarker = new L.Icon({
    iconUrl: require("./icons/nectec-icon-marker.jpg"),
    iconSize: [30,25],
  })

  // const myMarker = L.divIcon({
  //   className:'custom-marker',
  //   html:`<img src='${process.env.PUBLIC_URL}/images/nectec-icon.jpg'/>`
  // });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      axios
        .get("/smartparking/api/info/building/all")
        .then((res) => {
          setDataResponse(res.data['data']);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  },[]);


  return (
    <MapContainer 
    style={{height:"600px", width:"90%"}}
    //lat,lng
    center={[14.076691074357981 , 100.60166081310356]} 
    zoom={15} 
    // zoomControl={false}
    ref={mapRef}
    >
      <TileLayer
      url='https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=YpSw9luP70B4cQcamMIZ'
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">
      &copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">
      &copy; OpenStreetMap contributors</a>'
      />

      {dataResponse.map((building, index) => (
              <Marker
              position={[building.lat, building.lng]}
              icon={myMarker}
              key={index}
              >
                <Popup>
                  <b>{building.buildingName}</b>
                </Popup>
              </Marker>
      ))}

    </MapContainer>
  )
}

export default Map