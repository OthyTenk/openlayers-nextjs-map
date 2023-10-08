import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

type makeTextArgs = {
  text: string;
  size?: number;
  color?: string;
  outline?: boolean;
  isMarker?: boolean;
};

export const icon = {
  marker: "/images/marker-basic.png",
  selected: "/images/marker-selected.png",
};

export const makeText = ({
  text = "",
  size = 15,
  color = "black",
  outline = true,
  isMarker = false,
}: makeTextArgs) => {
  const textInstance = new Text({
    text,
    textAlign: "center",
    font: `${size}px roboto, sans-serif`,
    fill: new Fill({
      color,
    }),
    offsetY: isMarker ? -50 : 0,
    overflow: true,
    stroke: outline
      ? new Stroke({
          color: "white",
          width: 3,
        })
      : undefined,
  });
  return textInstance;
};
