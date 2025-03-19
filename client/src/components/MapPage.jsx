import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import html2canvas from "html2canvas";
import "./css/MapPage.css";
import { FaTrash } from "react-icons/fa";

const MapPage = () => {
  const [selectedBounds, setSelectedBounds] = useState(null);
  const mapRef = useRef(null);

  // Handle rectangle creation
  const handleCreated = (e) => {
    if (e.layerType === "rectangle") {
      const { _southWest, _northEast } = e.layer.getBounds();
      setSelectedBounds([
        [_southWest.lat, _southWest.lng],
        [_northEast.lat, _northEast.lng],
      ]);

      e.layer.setStyle({
        color: "black",
        weight: 2,
        opacity: 1,
        dashArray: "5, 5", // Dashed border effect for visibility
      });
    }
  };

  /*// Handle rectangle movement (Dragging & Resizing)
  const handleEdited = (e) => {
    e.layers.eachLayer((layer) => {
      const { _southWest, _northEast } = layer.getBounds();
      setSelectedBounds([
        [_southWest.lat, _southWest.lng],
        [_northEast.lat, _northEast.lng],
      ]);
    });
  };*/

  // Delete the selected area
  const handleDelete = () => {
    setSelectedBounds(null);
  };

  // Capture and download selected area
  const handleSave = async () => {
    if (!selectedBounds || !mapRef.current) return;

    html2canvas(mapRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "sat.png";
      link.click();
    });
  };

  return (
    <div className="map-wrapper">
      {/*heading for the page*/}
      <div className="map-heading">Select the Area</div>

      {/* Map Container */}
      <div className="map-container" ref={mapRef}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Rectangle Draw & Drag Feature */}
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleCreated}
              draw={{
                rectangle: {
                  shapeOptions: {
                    color: "black", // Border color while dragging
                    weight: 2, // Border thickness
                    opacity: 1, // Ensure visibility
                    dashArray: "5,5",
                  },
                },
                polygon: false,
                circle: false,
                marker: false,
                polyline: false,
                circlemarker: false,
              }}
              edit={{
                edit: {
                  selectedPathOptions: {
                    color: "blue", // Changes to blue after selection
                    weight: 3,
                    opacity: 1,
                  },
                },
                remove: true, // Allow deletion
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {/* Selected Coordinates Display */}
      <div className="coordinates">
        {selectedBounds ? (
          <p>Selected Coordinates: {JSON.stringify(selectedBounds)}</p>
        ) : (
          <p>No area selected.</p>
        )}
      </div>

      {/* Delete Button */}
      <div className="map-actions">
        <button onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>

      {/* Save Button */}
      <button className="save-btn" onClick={handleSave}>
        Download Image
      </button>
    </div>
  );
};

export default MapPage;