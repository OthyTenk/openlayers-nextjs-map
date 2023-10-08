export const ANNOTATION_COLOR = {
  RED: {
    fill: (opacity: number) => `rgba(248, 7, 1, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(248, 7, 1, ${opacity})`,
  },
  YELLOW: {
    fill: (opacity: number) => `rgba(255, 254, 0, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(255, 254, 0, ${opacity})`,
  },
  GREEN: {
    fill: (opacity: number) => `rgba(30, 128, 0, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(30, 128, 0, ${opacity})`,
  },
  SKYBLUE: {
    fill: (opacity: number) => `rgba(135, 206, 235, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(135, 206, 235, ${opacity})`,
  },
  BLUE: {
    fill: (opacity: number) => `rgba(2, 26, 255, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(2, 26, 255, ${opacity})`,
  },
  BROWN: {
    fill: (opacity: number) => `rgba(165, 42, 42, ${0.3 * opacity})`,
    stroke: (opacity: number) => `rgba(165, 42, 42, ${opacity})`,
  },
  SELECT: {
    fill: () => "rgba(1, 1, 1, 0.5)",
    stroke: () => "rgb(1, 1, 1)",
  },
};
