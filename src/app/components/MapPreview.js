"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPreview({ lat, lng, history = [] }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "300px", borderRadius: "12px" }}
    >
     <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution='Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
/>

      {/* Current Location */}
      <Marker position={[lat, lng]}>
        <Popup>Current Location</Popup>
      </Marker>

      {/* Historical Usage
      {history.map((entry, index) => (
        <Marker
          key={index}
          position={[
            entry.location.coordinates[1],
            entry.location.coordinates[0],
          ]}
        >
          <Popup>
            {entry.fullName} <br />
            {entry.phone}
          </Popup>
        </Marker>
      ))} */}
    </MapContainer>
  );
}
