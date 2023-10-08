import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { createContext } from "react";

export interface FeatureContextItems {
  selectedFeature: Feature<Geometry> | Feature<Geometry>[] | null;
  selectFeature: (
    feature: Feature<Geometry> | Feature<Geometry>[] | null
  ) => void;
  unSelectFeature: () => void;
}

export const FeatureContext = createContext<FeatureContextItems | null>(null);
