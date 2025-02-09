import React from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import "./css/MapContainer.css";


export const MyMapContainer = () => {
  const _onCreate = (e) => {
    console.log(e);
  }
  
  const _onEdit = (e) => {
    console.log(e);
  }

  const _onDelete = (e) => {
    console.log(e);
  }

    return ( <MapContainer center={[28.7041, 77.1025]} zoom={13} style={{height: "300px", width: "80%"}}>

      <FeatureGroup>
        <EditControl position='topright' onCreated={_onCreate} onEdited={_onEdit} onDeleted={_onDelete}
        draw={{
          circle: false,
          polyline: false,
          polygon: true,
          circlemarker: false, 
          marker: false,
          rectangle: {
            shapeOptions: {
              color: "blue", // Define color to ensure properties are set
            },
          }
        }}/>
      </FeatureGroup>

        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    );
}
