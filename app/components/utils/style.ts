import { isArray } from "lodash";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { Fill, Stroke, Style, Text } from "ol/style";

import CircleStyle from "ol/style/Circle";
import { ANNOTATION_COLOR } from "../constants";

interface SelectStyleImpl {
  beforeStyle: Style | Style[] | null;
  currentFeature: Feature<Geometry> | Feature<Geometry>[] | null;
  makeSelectingStyle(feature: Feature<Geometry>): void;
  makeSelectingsStyle(feature: Feature<Geometry>[]): void;
  makeUnSelectingStyle(): void;
  makeUnSelectingStyle(clickSelf: boolean): void;
  makeUnSelectingsStyle(): void;
}

export class SelectStyle implements SelectStyleImpl {
  beforeStyle: Style | Style[] | null = null;
  currentFeature: Feature<Geometry> | Feature<Geometry>[] | null = null;
  makeSelectingStyle(feature: Feature<Geometry>) {
    if (this.currentFeature && isArray(this.currentFeature)) {
      this.makeUnSelectingsStyle();
    } else if (this.currentFeature && !isArray(this.currentFeature)) {
      this.makeUnSelectingStyle();
    }
    this.currentFeature = feature;
    this.beforeStyle = feature.getStyle() as Style;
    const currentStyle = (feature.getStyle() as Style).clone();
    currentStyle.setStroke(
      new Stroke({
        color: ANNOTATION_COLOR["SELECT"].stroke(),
        width: 2,
      })
    );
    currentStyle.setFill(
      new Fill({
        color: ANNOTATION_COLOR["SELECT"].fill(),
      })
    );
    feature.setStyle(currentStyle);
  }

  makeSelectingsStyle(features: Feature<Geometry>[]) {
    if (this.currentFeature && isArray(this.currentFeature)) {
      this.makeUnSelectingsStyle();
    } else if (this.currentFeature && !isArray(this.currentFeature)) {
      this.makeUnSelectingStyle();
    }
    this.currentFeature = features;
    this.beforeStyle = features.map((feature) => {
      return feature.getStyle() as Style;
    });

    const currentStyles = features.map((feature) => {
      return (feature.getStyle() as Style).clone();
    });

    currentStyles.forEach((currentStyle, index) => {
      const imageStyle = currentStyle.getImage() as CircleStyle;

      imageStyle.setStroke(
        new Stroke({
          color: ANNOTATION_COLOR["SELECT"].stroke(),
          width: 2,
        })
      );
      imageStyle.setFill(
        new Fill({
          color: ANNOTATION_COLOR["SELECT"].fill(),
        })
      );
      features[index].setStyle(currentStyle);
    });
  }

  makeUnSelectingsStyle(): void {
    if (
      this.currentFeature &&
      this.beforeStyle &&
      isArray(this.currentFeature) &&
      isArray(this.beforeStyle)
    ) {
      this.beforeStyle.forEach((style, index) => {
        (this.currentFeature as Feature<Geometry>[])[index].setStyle(style);
      });
    }
    this.currentFeature = null;
    this.beforeStyle = null;
  }

  makeUnSelectingStyle(): void;
  makeUnSelectingStyle(clickSelf: boolean): void;
  makeUnSelectingStyle(clickSelf?: boolean): void {
    if (
      this.currentFeature &&
      this.beforeStyle &&
      !isArray(this.currentFeature) &&
      !isArray(this.beforeStyle)
    ) {
      const markerProperties = this.currentFeature.getProperties();

      if (markerProperties["hasPopup"] && !clickSelf)
        this.beforeStyle.setText(new Text());

      this.currentFeature.setStyle(this.beforeStyle as Style);
    }
    this.currentFeature = null;
    this.beforeStyle = null;
  }
}
