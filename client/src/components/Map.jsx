import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../assets/google-maps.png';

const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const Map = ({ location }) => (
  <div>
    <MapContainer
      center={[location.latitude || 0, location.longitude || 0]}
      zoom={16}
      style={{ height: '320px', width: '100%', zIndex: '1' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker
        position={[location.latitude || 0, location.longitude || 0]}
        icon={markerIconConfig}
      />
    </MapContainer>
    <p>{location.address}</p>
  </div>
);
