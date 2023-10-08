/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useCallback } from "react";
import { useEffect, useRef } from "react";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import Icon from "ol/style/Icon";
import { Text } from "ol/style";
import { Coordinate } from "ol/coordinate";
import Style from "ol/style/Style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { SelectEvent } from "ol/interaction/Select";
import { icon, makeText } from "../utils/makeText";
import { ANNOTATION_COLOR } from "../constants";
import { FeatureLike } from "ol/Feature";
import { InnerText, InnerTextProps } from "../Text";
import { useMap } from "../hooks/useMap";
import { useInteractionEvent } from "../hooks/useInteractionEvent";


export interface Annotation {
  color?: keyof typeof ANNOTATION_COLOR;
  properties?: { [key: string]: string | number };
  onClick?: (event: {
    annotation: FeatureLike;
    properties: Record<string, any>;
  }) => void;
  onHover?: (event: {
    annotation: FeatureLike;
    properties: Record<string, any>;
  }) => void;
  zIndex?: number;
  opacity?: 1 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
  children?: ReactElement<InnerTextProps, typeof InnerText> | null;
}

export interface CustomMarkerProps extends Annotation {
  center: Coordinate;
  selected?: boolean;
}

export const CustomMarker = ({
  center,
  color = "BLUE",
  properties = {},
  onClick,
  onHover,
  zIndex = 0,
  selected = false,
  opacity = 1,
  children,
}: CustomMarkerProps) => {
  const map = useMap();
  const annotationRef = useRef<Feature<Point>>(
    new Feature(new Point(fromLonLat(center)))
  );
  const annotationLayerRef = useRef<VectorLayer<VectorSource>>(
    new VectorLayer({
      source: new VectorSource({
        features: [annotationRef.current],
      }),
    })
  );
  const annotationStyleRef = useRef(
    new Style({
      text:
        children && !children.props.isPopup
          ? makeText({
              text: children.props.children || "",
              size: children.props.size || 15,
              color: children.props.color ? children.props.color : "black",
              outline: children.props.outline,
              isMarker: true,
            })
          : undefined,
      image: new Icon({
        src: icon.marker, // marker image path
        scale: 0.07,
        anchor: [0.5, 1], // Anchor location in marker image
      }),
    })
  );

  const onHoverHandler = useCallback(
    (event: SelectEvent) => {
      if (event.selected.length > 0) {
        if (onHover) {
          onHover({ annotation: annotationRef.current, properties });
        }
      } else {
        // When no Circle is selected by hover event
        // Take action on opting out
        // Example: restore default styles, etc.
      }

      // Pop-ups are not involved when editing.
      if (map.getProperties().isModifying) return;

      // Pop up text
      if (event.selected.length > 0 && children?.props.isPopup) {
        annotationStyleRef.current.setText(
          makeText({
            text: children.props.children || "",
            size: children.props.size || 15,
            color: children.props.color ? children.props.color : "black",
            outline: children.props.outline,
            isMarker: true,
          })
        );

        annotationRef.current.setStyle(annotationStyleRef.current);
      } else if (event.selected.length === 0 && children?.props.isPopup) {
        annotationStyleRef.current.setText(new Text());
        annotationRef.current.setStyle(annotationStyleRef.current);
      }
    },
    [children, map, onHover, properties]
  );

  const onClickHandler = (event: SelectEvent) => {
    if (event.selected.length > 0) {
      // When there is a Circle selected by a click event
      if (onClick) {
        onClick({
          annotation: annotationRef.current,
          properties,
        });
      }
      // Perform actions on selected Features
      // Example: change style, display information, etc.
    }
  };

  useInteractionEvent({
    annotation: annotationLayerRef.current,
    onClick: onClickHandler,
    onHover: onHoverHandler,
  });

  useEffect(() => {
    if (annotationRef.current) {
      const geometry = annotationRef.current.getGeometry() as Point;
      geometry.setCoordinates(fromLonLat(center));
    }
  }, [center]);

  useEffect(() => {
    if (annotationLayerRef.current) {
      annotationLayerRef.current.setZIndex(zIndex);
    }
  }, [zIndex]);

  useEffect(() => {
    annotationStyleRef.current.setImage(
      new Icon({
        opacity,
        src: selected ? icon.selected : icon.marker, // marker image path
        scale: 0.07,
        anchor: [0.5, 1], // Anchor location in marker image
      })
    );

    annotationRef.current.setStyle(annotationStyleRef.current);
  }, [selected, opacity]);

  useEffect(() => {
    if (!children?.props?.color) return;
    const gottonText = annotationStyleRef.current.getText();
    if (gottonText) {
      gottonText.getFill().setColor(children.props.color);
    }

    annotationRef.current.setStyle(annotationStyleRef.current);
  }, [color, children]);

  useEffect(() => {
    if (annotationLayerRef.current && children && !children.props.isPopup) {
      annotationStyleRef.current.setText(
        makeText({
          text: children?.props?.children || "",
          size: children?.props?.size || 15,
          color: children?.props?.color ? children.props.color : "black",
          outline: children?.props?.outline,
          isMarker: true,
        })
      );
    }
  }, [children]);

  useEffect(() => {
    if (!children) {
      annotationStyleRef.current.setText(new Text());
    }
  }, [children]);

  useEffect(() => {
    annotationRef.current.setProperties({
      ...properties,
      shape: "Marker",
      isModifying: false,
      source: annotationLayerRef.current.getSource(),
      layer: annotationLayerRef.current,
      hasPopup: children ? children?.props.isPopup : false,
    });
  }, [properties]);

  useEffect(() => {
    map.addLayer(annotationLayerRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      map.removeLayer(annotationLayerRef.current);
    };
  }, [map]);
  return <></>;
};
