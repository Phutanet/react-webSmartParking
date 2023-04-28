import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from "axios";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import './LeafletMap.css'


function LeafletMap() {
    const firstRender = useRef(true);
    const [dataResponse, setDataResponse] = useState([]);
    const mapRef = useRef();
    const nectec = [14.077828 , 100.601605];
    
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const iconMarkup = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x" />);
    const customMarkerIcon = divIcon({
      html: iconMarkup,
      iconSize: [30, 30],
      iconAnchor: [14, 14],
      popupAnchor:[0, 0],
    });

    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;

        axios
          .get("/smartparking/api/info/building/all")
          .then((res) => {
            setDataResponse(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }, []);


  return (
    <MapContainer 
        style={{height:"100%", width:"100%"}}
        center={nectec}
        zoom={16}
        ref={mapRef}
    >
        <TileLayer 
            url='https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=s1VLdrvzosyfkK7uxGXP' 
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        {dataResponse.map((building) => (
          <Marker 
            key={building.buildingID}
            position={[building.lat, building.lng]}
            icon={customMarkerIcon}
          >
            <Popup className="popup-marker">
              <b>{building.buildingName}</b>
              <img src={building.image} alt={building.buildingName} />
            </Popup>
          </Marker>
        ))}

    </MapContainer>
  );
};

export default LeafletMap