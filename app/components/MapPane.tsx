'use client'
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import { useEffect, useRef, useState } from "react";
// import "./MapPane.css";
import { Attribution, FullScreen, Rotate, ScaleLine, defaults } from "ol/control";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import vector from "./utils/vector";
import mapConfig from "../config.json";
import GeoJSON from "ol/format/GeoJSON";
import { OSM, TileWMS } from "ol/source";

const WEB_MERCATOR_COORDINATE_SYSTEM_ID = "EPSG:4326"; 
const geojsonObject = mapConfig.geojsonObject;

const MapPane = () => {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    // Create OpenLayers map so we can display it to the user.
    const InitializeMap = new Map({
      // The collection of layers associated with this map.
      layers: [
        new TileLayer({
          source: new XYZ({
            // url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga",
            projection: "EPSG:3857",
          }),
        }),
        // new TileLayer({
        //   source: new OSM(),
        // }),
        new TileLayer({
          source: new TileWMS({
            url: "https://ahocevar.com/geoserver/wms",
            params: {
              layers: "topp:states",
              TILED: true,
            },
            projection: "EPSG:4326",
          }),
        }),
      ],
      /* The map's view allows to specify the center,
       * zoom, resolution, and rotation of the map.
       */
      view: new View({
        // The map view projection.
        projection: WEB_MERCATOR_COORDINATE_SYSTEM_ID, // "EPSG:3857"
        center: [106.918556, 47.92123],
        zoom: 14,
        minZoom: 0,
        maxZoom: 28,
      }),
      /* The map's default controls is a visible widget with a DOM
       * element in a fixed position on the map.
       */
      controls: defaults({ attribution: false }).extend([
        new Attribution({
          collapsed: true,
          collapsible: true,
        }),
        // Add a fullscreen button control to the map.
        new FullScreen(),
        // Add scale line control to the map.
        new ScaleLine(),
        // Add a reset rotation button control to the map.
        new Rotate(),
      ]),
    });

    // Set the Initialized map to the map target element.
    InitializeMap.setTarget(mapTargetElement.current || "");
    // Set the current map, so we can continue working with it.
    setMap(InitializeMap);

    /* We set map target to "undefined", an empty string to represent a
     * nonexistent HTML element ID, when the React component is unmounted.
     * This prevents multiple maps being added to the map container on a
     * re-render.
     */
    return () => InitializeMap.setTarget("");
  }, []);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    ></div>
  );
};

export default MapPane;
