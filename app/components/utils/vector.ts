"use client";
import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";

interface VectorProps {
  features?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
}

const vector = ({ features }: VectorProps) =>
  new VectorSource({
    features: features ?? [],
  });

export default vector;
