import { useContext } from "react";

import { Map } from "ol";
import { MapContext } from "../MapContext";

export function useMap() {
  return useContext(MapContext) as Map;
}
