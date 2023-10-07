"use client";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { useState } from "react";
import mapConfig from "./config.json";

import MapPane from "./components/MapPane";


const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

const addMarkers = (lonLatArray:any) => {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });

  let features = lonLatArray.map((item:any) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  
  return features;
}

export default function Home() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));
  
  return (
    // <div className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <Map1 center={fromLonLat(center) as [number, number]} zoom={zoom}>
    //     <Layers>
    //       <TileLayer source={osm} zIndex={0} />
    //       {showLayer1 && (
    //         <VectorLayer
              // source={vector({
              //   features: new GeoJSON().readFeatures(geojsonObject, {
              //     dataProjection: "EPSG:4326",
              //     // featureProjection: get("EPSG:3857"),
              //   }),
              // })}
    //           style={FeatureStyles.MultiPolygon}
    //         />
    //       )}
    //       {showLayer2 && (
    //         <VectorLayer
    //           source={vector({
    //             features: new GeoJSON().readFeatures(geojsonObject2, {
    //               dataProjection: "EPSG:4326",
    //               // featureProjection: get("EPSG:3857"),
    //             }),
    //           })}
    //           style={FeatureStyles.MultiPolygon}
    //         />
    //       )}
    //       {showMarker && (
    //         <VectorLayer source={vector({ features })} style={new Style()} />
    //       )}
    //     </Layers>
    //     <Control>
    //       <FullScreenControl />
    //     </Control>
    //   </Map1>
    //   <div>
    //     <input
    //       type="checkbox"
    //       checked={showLayer1}
    //       onChange={(event) => setShowLayer1(event.target.checked)}
    //     />{" "}
    //     Johnson County
    //   </div>
    //   <div>
    //     <input
    //       type="checkbox"
    //       checked={showLayer2}
    //       onChange={(event) => setShowLayer2(event.target.checked)}
    //     />{" "}
    //     Wyandotte County
    //   </div>
    //   <hr />
    //   <div>
    //     <input
    //       type="checkbox"
    //       checked={showMarker}
    //       onChange={(event) => setShowMarker(event.target.checked)}
    //     />{" "}
    //     Show markers
    //   </div>
    // </div>
    <MapPane/>
  );
}
