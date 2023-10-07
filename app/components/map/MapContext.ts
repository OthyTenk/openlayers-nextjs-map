"use client";
import  Map  from "ol/Map";
import { createContext } from "react";

export interface MapContextProps {
  map: Map;
}

const MapContext = createContext<MapContextProps>({map: new Map()});
export default MapContext;
