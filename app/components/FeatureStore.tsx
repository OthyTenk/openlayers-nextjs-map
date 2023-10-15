import MapBrowserEvent from "ol/MapBrowserEvent";
import { ReactNode, useEffect, useMemo, useRef } from "react";

import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";

import { isArray } from "lodash";
import { FeatureContext } from "./FeatureContext";
import { useMap } from "./hooks/useMap";
import { useResetabledState } from "./hooks/useResetabledState";
import { SelectedFeature } from "./layers/SelectedFeature";
import { SelectStyle } from "./utils/style";

export interface FeatureStoreProps {
  /**
   * @default false
   * @description If you set this property to 'true', you can see selection of annotations.
   */
  isAbledSelection?: boolean;

  children?: ReactNode;
}

export function FeatureStore({
  isAbledSelection = false,
  children,
}: FeatureStoreProps) {
  const map = useMap();

  const [selectedFeature, selectFeature, unSelectFeature] = useResetabledState<
    Feature<Geometry> | Feature<Geometry>[] | null
  >();

  const providerValue = useMemo(
    () => ({ selectedFeature, selectFeature, unSelectFeature }),
    [selectedFeature, selectFeature, unSelectFeature]
  );

  const selectedFeatureStyleRef = useRef<SelectStyle>(new SelectStyle());

  const onClick = (e: MapBrowserEvent<any>) => {
    const mapProperties = map.getProperties();

    if (mapProperties["isDrawing"] === true) {
      return;
    }

    const pixel = e.pixel;

    // Reverse to select from above overlapping markers
    const reversedFeture: FeatureLike[] = map
      .getFeaturesAtPixel(pixel)
      .reverse();

    reversedFeture.forEach((feature) => {
      if (!feature.getProperties().shape) return;
      // If you select a marker that has already been selected again, it will be deactivated.
      if (selectedFeature === feature) {
        unSelectFeature();
      } else {
        selectFeature(feature as Feature<Geometry>);
      }
    });
  };
  useEffect(() => {
    map.on("click", onClick);
    return () => {
      map.un("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selectedFeature]);

  useEffect(() => {
    const feature = selectedFeature as Feature<Geometry>;
    // Deselect
    if (!feature) {
      if (isArray(selectedFeatureStyleRef.current.currentFeature)) {
        selectedFeatureStyleRef.current.makeUnSelectingsStyle();
      } else {
        selectedFeatureStyleRef.current.makeUnSelectingStyle();
      }
      return;
    }

    if (feature.getProperties()["shape"] !== "MultiPoint") {
      selectedFeatureStyleRef.current.makeSelectingStyle(
        feature as Feature<Geometry>
      );
    } else {
      const multiPointSource = feature.getProperties()
        .source as VectorSource<Geometry>;
      const multiPointFeatures = multiPointSource.getFeatures();
      selectedFeatureStyleRef.current.makeSelectingsStyle(multiPointFeatures);
    }
  }, [selectedFeature]);

  return (
    <FeatureContext.Provider value={providerValue}>
      {isAbledSelection && <SelectedFeature feature={selectedFeature} />}
      {children}
    </FeatureContext.Provider>
  );
}
