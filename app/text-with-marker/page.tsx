"use client";

import { MapContainer } from "@/app/components/MapContainer";
import { TileLayer } from "@/app/components/layers/TileLayer";
import { Map } from "ol";
import { useRef, useState } from "react";
import { InnerText } from "../components/Text";
import { CustomMarker } from "../components/layers/CustomMarker";
import { LayerGroup } from "../components/layers/LayerGroup";
import { Mali } from "next/font/google";
import { set } from "lodash";

export default function TextWithMarker() {
  const [mapSize, setMapSize] = useState({
    width: "100vw",
    height: "60vh",
  });
  const ref = useRef<Map>(null);
  const [selectedMarker, setSelectedMarker] = useState("");
  const [selectedMarkerName, setSelectedMarkerName] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const markers = [
    { id: "124", name: "Хан-Уул", point: [106.895121, 47.898304] },
    { id: "4643", name: "Парк од", point: [106.9348699, 47.9196281] },
  ];

  const onClickMarker = (id: string, name: string) => {
    setSelectedMarker(id);
    setSelectedMarkerName(name);
    setOpenSidebar(true);
  };
  return (
    <div className="relative">
      {openSidebar && (
        <div className="bg-slate-200 top-0 left-0 bottom-0 w-60 h-full absolute z-20">
          <div className="flex justify-between items-center px-2 py-1">
            <div className="text-white text-xl">Маркерууд</div>
            <div
              className="text-white text-xl"
              onClick={() => setOpenSidebar(false)}
            >
              X
            </div>
          </div>
          <div className="p-2">
            <div>{selectedMarker}</div>
            <div>{selectedMarkerName}</div>
          </div>
        </div>
      )}
      <MapContainer
        height={mapSize.height}
        width={mapSize.width}
        ref={ref}
        isAbledSelection={true}
      >
        <TileLayer
          maxZoom={23}
          crossOrigin={"anonymous"}
          url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
        />

        <LayerGroup zIndex={1}>
          {markers.map((marker, index) => (
            <CustomMarker
              key={index}
              properties={{ id: marker.id }}
              onClick={() => onClickMarker(marker.id, marker.name)}
              center={marker.point}
            >
              <InnerText isPopup={true} outline>
                {marker.name}
              </InnerText>
            </CustomMarker>
          ))}
        </LayerGroup>
      </MapContainer>
    </div>
  );
}
