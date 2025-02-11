import React from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

export const MyMapContainer = () => {
  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "rectangle") {
      const bounds = layer.getBounds(); // Clicked location (top-left corner)
      console.log(bounds);
    }
  };

  const _onEdit = (e) => {
    console.log("Edited layers:", e.layers);
    e.layers.eachLayer((layer) => {
      if (layer instanceof L.Rectangle) {
        console.log("Updated Rectangle Bounds:", layer.getBounds());
      }
    });
  };

  const _onDelete = (e) => {
    console.log("Deleted layers:", e.layers);
  };

  return (
    <MapContainer
      center={[28.7041, 77.1025]}
      zoom={13}
      style={{ height: "300px", width: "80%" }}
    >
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onEdited={_onEdit}
          onDeleted={_onDelete}
          draw={{
            circle: false,
            polyline: false,
            polygon: false,
            circlemarker: false,
            marker: false,
            rectangle: {
              repeatMode: false,
              metric: false
            },
          }}
        />
      </FeatureGroup>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
