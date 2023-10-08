"use client";

import { MapContainer } from "@/app/components/MapContainer";
import { TileLayer } from "@/app/components/layers/TileLayer";
import { Map } from "ol";
import { useRef, useState } from "react";
import { InnerText } from "../components/Text";
import { LayerGroup } from "../components/layers/LayerGroup";
import { CustomMarker } from "../components/layers/CustomMarker";




export default function TextWithMarker() {
    const[mapSize, setMapSize] = useState({
      width: "100vw",
      height: "100vh",
    });
    const ref = useRef<Map>(null);
  return (
    <div>
      <MapContainer
        height={mapSize.height}
        width={mapSize.width}
        ref={ref}
        isAbledSelection
      >
        <TileLayer
          maxZoom={23}
          crossOrigin={"anonymous"}
          url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
        />
        
        <LayerGroup zIndex={1}>
          <CustomMarker center={[126.840746, 35.190475]}>
              <InnerText outline>
                Text here
              </InnerText>
          </CustomMarker>
        </LayerGroup>
      </MapContainer>
    </div>
  );
}
