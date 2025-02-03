import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

export const MyMapContainer = () => {
    return <MapContainer center={[28.7041, 77.1025]} zoom={13} style={{height: "300px", width: "80%"}}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
}
