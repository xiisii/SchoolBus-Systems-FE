// components/MapComponent.tsx
import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { fromLonLat, transformExtent } from "ol/proj.js";
import { Feature } from "ol";
import Point from "ol/geom/Point.js";
import { Style, Icon } from "ol/style.js";
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";

const OpenLayerMap: React.FC = () => {
  useEffect(() => {
    const paracelCoords = fromLonLat([112.0, 16.5]); // Coordinates for Hoàng Sa (Paracel Islands)
    const spratlyCoords = fromLonLat([114.0, 10.0]); // Coordinates for Trường Sa (Spratly Islands)
    const thuDucCoords = fromLonLat([106.769, 10.8488]); // Coordinates for Thủ Đức, Ho Chi Minh City
    const area1 = fromLonLat([106.816997, 10.952648]); // Coordinates for Thủ Đức, Ho Chi Minh City
    const area2 = fromLonLat([106.631087, 10.855654]); // Coordinates for Thủ Đức, Ho Chi Minh City
    const area3 = fromLonLat([106.772055, 10.85057]); // Coordinates for Thủ Đức, Ho Chi Minh City
    const area4 = fromLonLat([106.808897, 10.840788]); // Coordinates for Thủ Đức, Ho Chi Minh City
    const area5 = fromLonLat([106.67911, 10.770358]); // Coordinates for Thủ Đức, Ho Chi Minh City

    // Define the extent for Vietnam (approximate bounding box)
    const vietnamExtent = transformExtent(
      [101.0, 8.0, 111.0, 24.0], // Lon/Lat bounds to include Biển Đông
      "EPSG:4326",
      "EPSG:3857"
    );

    const map: any = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: thuDucCoords, // Center of the map at Thủ Đức, Ho Chi Minh City
        zoom: 12, // Zoom level to focus on Thủ Đức
        extent: vietnamExtent, // Restrict the map view to Vietnam
      }),
    });

    const paracelMarker = new Feature({
      geometry: new Point(paracelCoords),
    });

    const spratlyMarker = new Feature({
      geometry: new Point(spratlyCoords),
    });
    const thuDucMarker = new Feature({
      geometry: new Point(thuDucCoords),
    });
    const area1Marker = new Feature({
      geometry: new Point(area1),
    });
    const area2Marker = new Feature({
      geometry: new Point(area2),
    });
    const area3Marker = new Feature({
      geometry: new Point(area3),
    });
    const area4Marker = new Feature({
      geometry: new Point(area4),
    });
    const area5Marker = new Feature({
      geometry: new Point(area5),
    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // URL to the red marker icon
      }),
    });

    // paracelMarker.setStyle(iconStyle);
    // spratlyMarker.setStyle(iconStyle);
    // thuDucMarker.setStyle(iconStyle);
    area1Marker.setStyle(iconStyle);
    area2Marker.setStyle(iconStyle);
    area3Marker.setStyle(iconStyle);
    area4Marker.setStyle(iconStyle);
    area5Marker.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [
        paracelMarker,
        spratlyMarker,
        thuDucMarker,
        area1Marker,
        area2Marker,
        area3Marker,
        area4Marker,
        area5Marker,
      ],
    });

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(markerLayer);

    // Add click event listener
    map.on("click", (event: any) => {
      const clickedCoords = event.coordinate;
      const newMarker = new Feature({
        geometry: new Point(clickedCoords),
      });
      newMarker.setStyle(iconStyle);
      vectorSource.addFeature(newMarker);
      map.getView().setCenter(clickedCoords);
      map.getView().setZoom(12);
    });

    // Clean up map on unmount
    return () => map.setTarget(null);
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default OpenLayerMap;
