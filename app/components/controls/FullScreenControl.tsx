import { FullScreen } from "ol/control";
import Map from "ol/Map";
import { FC, useContext, useEffect } from "react";
import MapContext from "../map/MapContext";

export const FullScreenControl: FC = () => {
  const context = useContext(MapContext);

  useEffect(() => {
    if (!context) {
      console.error("Map object is not available.");
      return;
    }
    const { map } = context;

    if (!(map instanceof Map)) {
      console.error("Map object is not an instance of Map.");
      return;
    }

    let fullScreenControl = new FullScreen({});

    if (!map.getControls()) {
      console.error("Controls are not available on the map object.");
      return;
    }

    map.addControl(fullScreenControl);

    // return () => {
    //   return map.removeControl(fullScreenControl);
    // }

  }, [context]);

  return null;
};
