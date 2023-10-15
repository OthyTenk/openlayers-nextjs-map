import { Map, View } from "ol";
import { Control, Zoom, defaults as defaultControls } from "ol/control";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import {
    ReactNode,
    createContext,
    forwardRef,
    memo,
    useEffect,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from "react";

import { boundingExtent } from "ol/extent";
import { DoubleClickZoom } from "ol/interaction";
import "ol/ol.css";
import VectorSource from "ol/source/Vector";
import { FeatureStore } from "./FeatureStore";
import { MapContext } from "./MapContext";
import { useHoverCursor } from "./hooks/useHoverCursor";

export type Lng = number;
export type Lat = number;
export type Location = [Lng, Lat];

export const ControlContext = createContext<{
  drawVectorSource: VectorSource;
} | null>(null);

export interface MapProps {
  scrollWheelZoom?: boolean;

  /**
   * @default 24
   */
  maxZoom?: number;

  /**
   * @default 3
   */
  minZoom?: number;
  fullscreenControl?: boolean;

  /**
   * @default true.
   */
  isZoomAbled?: boolean;

  /**
   * @default true.
   */
  isRotateAbled?: boolean;

  /**
   * @default [127.9745613, 37.3236563]
   */
  center?: Location;

  /**
   * @default 15
   */
  zoomLevel?: number;

  /**
   * @default null
   * @description [[minX, minY], [maxX, maxY]]
   */
  bounds?: [Location, Location];

  /**
   * @default "1000px"
   */
  height?: string;

  /**
   * @default "1000px"
   */
  width?: string;

  /**
   * @default true
   */
  isShownOsm?: boolean;

  /**
   * @default false
   * @description If you set this property to 'true', you can see selection of annotations.
   */
  isAbledSelection?: boolean;

  children?: ReactNode;
}

export const MapContainer = memo(
  forwardRef<Map, MapProps>(
    (
      {
        children,
        isZoomAbled = true,
        isRotateAbled = false,
        center = [106.895121, 47.898304],
        zoomLevel = 12,
        bounds,
        maxZoom = 24,
        minZoom = 3,
        height = "1000px",
        width = "1000px",
        isShownOsm = true,
        isAbledSelection = false,
      },
      ref
    ) => {
      const id = useId();
      const mapId = `nextjs-openlayers-map-${id}`;
      const osmRef = useRef<TileLayer<OSM>>(
        new TileLayer({
          source: new OSM({
            crossOrigin: "anonymous",
          }),
          zIndex: -1000,
        })
      );
      const mapObj = useRef<Map>(
        new Map({
          view: new View({
            zoom: zoomLevel,
          }),
          controls: defaultControls({
            zoom: isZoomAbled,
            rotate: isRotateAbled,
          }).extend([]),
        })
      );

      const drawVectorSource = useRef<VectorSource>(new VectorSource());

      useEffect(() => {
        if (isShownOsm) {
          mapObj.current.addLayer(osmRef.current);
        } else {
          mapObj.current.removeLayer(osmRef.current);
        }
      }, [isShownOsm]);

      useEffect(() => {
        if (mapObj.current) {
          const view = mapObj.current.getView();
          view.setMinZoom(!isZoomAbled ? zoomLevel : minZoom);
        }
      }, [isZoomAbled, minZoom, zoomLevel]);

      useEffect(() => {
        if (mapObj.current) {
          const view = mapObj.current.getView();
          view.setMaxZoom(!isZoomAbled ? zoomLevel : maxZoom);
        }
      }, [maxZoom, isZoomAbled, zoomLevel]);

      useEffect(() => {
        if (mapObj.current) {
          const view = mapObj.current.getView();
          view.setZoom(zoomLevel);
        }
      }, [zoomLevel]);

      useEffect(() => {
        if (mapObj.current && center) {
          const view = mapObj.current.getView();
          view.setCenter(fromLonLat(center));
        }
      }, [center]);

      useEffect(() => {
        if (mapObj.current && bounds) {
          const view = mapObj.current.getView();

          view.fit(
            boundingExtent([fromLonLat(bounds[0]), fromLonLat(bounds[1])]),
            {
              padding: [20, 20, 20, 20],
            }
          );
        }
      }, [bounds]);

      useHoverCursor(mapObj.current);

      useImperativeHandle(ref, () => mapObj.current);

      useLayoutEffect(() => {
        const mapRef = mapObj.current;
        mapRef.getInteractions().forEach((interaction) => {
          if (interaction instanceof DoubleClickZoom) {
            interaction.setActive(false);
          }
        });
        const defaultZoomControl = mapRef
          .getControls()
          .getArray()
          .find((control: Control) => control instanceof Zoom);

        if (defaultZoomControl) {
          mapRef.removeControl(defaultZoomControl);
        }
        mapRef.setTarget(mapId);
        return () => {
          mapRef.setTarget(undefined);
          mapRef.setLayers([]);
        };
      }, [mapId]);

      // MapContext.Provider is used for using mapObj in child components.
      return (
        <MapContext.Provider value={mapObj.current}>
          <ControlContext.Provider
            value={{ drawVectorSource: drawVectorSource.current }}
          >
            <FeatureStore isAbledSelection={isAbledSelection}>
              <div
                id={mapId}
                className="nextjs-openlayers-map-container"
                style={{ width, height }}
              >
                {children}
              </div>
            </FeatureStore>
          </ControlContext.Provider>
        </MapContext.Provider>
      );
    }
  )
);
