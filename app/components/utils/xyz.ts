"use client";
import { XYZ } from "ol/source";
import { AttributionLike } from "ol/source/Source";

interface XYZprops {
  url: string;
  attributions?: AttributionLike;
  maxZoom?: number;
}

const xyz = ({ url, attributions, maxZoom }: XYZprops) =>
  new XYZ({
    url,
    attributions,
    maxZoom,
  });

export default xyz;
