"use client";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { useState } from "react";
import mapConfig from "./config.json";

import MapPane from "./components/MapPane";
import Link from "next/link";
import PageLink from "./components/Navbar";


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
    <div className="p-2">
      <MapPane />
    </div>
  );
}
