import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
const Map = () => (
  <MapContainer
    className="w-full h-full  lg:w-full lg:h-full md:mx-20 lg:mx-0 z-0"
    center={[10.874243, 106.7948193]}
    zoom={13}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[10.874243, 106.7948193]}>
      {/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
    </Marker>
  </MapContainer>
);

export default Map;
