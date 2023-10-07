"use client";
import { Tile } from "ol/layer";
import { FC, useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import View from "ol/View";

interface TileLayerProps {
  source: any;
  zIndex?: number;
}

const TileLayer: FC<TileLayerProps> = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext) || {};

  useEffect(() => {
    if (!map) return;

    let tileLayer = new Tile({
      source,
      zIndex,
    })

    if (typeof map.addLayer !== "function") {
      console.error("addLayer method is not available on the map object.");
      return;
    }

    map.addLayer(tileLayer);
    // tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};

export default TileLayer;
