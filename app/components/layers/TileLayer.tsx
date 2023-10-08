import React from "react";
import { useEffect } from "react";
import OlTileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { useMap } from "../hooks/useMap";
import { TileUrl } from "../utils/tileUrl";

export interface TileLayerProps {
  url: string;

  /**
   * @default 0
   */
  zIndex?: number;

  /**
   * @default 42
   */
  maxZoom?: number;

  /**
   * @default 0
   */
  minZoom?: number;

  /**
   * @default null
   * @description 	
The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data with the Canvas renderer. See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
   */
  crossOrigin?: null | string | undefined;

  errorTileUrl?: string;
}

export const TileLayer = ({
  url,
  zIndex = 0,
  maxZoom = 42,
  minZoom = 0,
  crossOrigin = null,
  errorTileUrl,
}: TileLayerProps) => {
  const map = useMap();

  useEffect(() => {
    const customTmsSource = new XYZ({
      maxZoom,
      minZoom,
      crossOrigin,
      tileUrlFunction: (tileCoord) => {
        const tileUrl = new TileUrl(url);
        const z = tileCoord[0];
        const x = tileCoord[1];
        const y = Math.pow(2, z) - tileCoord[2] - 1;
        const tileImageUrl = tileUrl.getUrlFromPosition(z, x, y);
        return tileImageUrl || errorTileUrl || ""; // Return error tile URL if tile URL is not found.
      },
    });

    const customTmsLayer = new OlTileLayer({
      source: customTmsSource,
      zIndex,
    });

    map.addLayer(customTmsLayer);

    return () => {
      map.removeLayer(customTmsLayer);
    };
  }, [map, errorTileUrl, zIndex, maxZoom, minZoom, crossOrigin, url]);
  return <></>;
};
