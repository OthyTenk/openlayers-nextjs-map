"use client";

import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import MapContext from "./MapContext";
import View from "ol/View";
import Map from "ol/Map";


interface MapProps {
  zoom: number;
  center: [number, number];
  children: ReactNode;
}

export const Map1: FC<MapProps> = ({ children, zoom, center }) => {
  const mapRef = useRef<HTMLDivElement>();
  const [map, setMap] = useState<Map>({} as Map);

  // on component mount
  useEffect(() => {
    if (!mapRef.current) return;

    let options = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    let mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget("");
  }, [setMap, mapRef, zoom, center]);

  if (!map) return null;

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef as RefObject<HTMLDivElement>} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};
