"use client";
import { Geometry } from "ol/geom";

import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { StyleLike } from "ol/style/Style";
import { FlatStyleLike } from "ol/style/flat";
import { FC, useContext, useEffect } from "react";
import MapContext from "../map/MapContext";

interface VectorLayerProps {
  source: VectorSource<Geometry>;
  zIndex?: number;
  style: StyleLike | FlatStyleLike;
}

const VectorLayer: FC<VectorLayerProps> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext) || {};

  useEffect(() => {
    if (!map) return;

    // let vectorLayer = new OLVectorLayer({
    //   source,
    //   style,
    // });
    let vectorLayer = new Vector({
      source,
      style,
    });

    if (typeof map.addLayer !== "function") {
      console.error("addLayer method is not available on the map object.");
      return;
    }

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex]);

  return null;
};

export default VectorLayer;
