"use client";

import { Feature, Map, View, Overlay } from "ol";
import { useEffect } from "react";

import { defaults } from "ol/control";
import { Point } from "ol/geom";
import { Tile, Vector } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Icon, Style, Text } from "ol/style";

export default function MarkerWithPopup() {
  
    useEffect(() => {
      // create Map instance
      const map = new Map({
        controls: defaults({ zoom: true, rotate: false }).extend([]),
        layers: [
          //   new Tile({
          //     source: new OSM(),
          //   }),
          new Tile({
            visible: true,
            maxZoom: 23,
            minZoom: 0,
            source: new XYZ({
              url: `https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga`,
            }),
          }),
        ],
        target: "map",
        view: new View({
          center: fromLonLat([106.918556, 47.92123]),
          zoom: 14,
        }),
      });

      // Marker Image
      let svgIcon =
        "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-47-24.png";

      // Create marker feature, Point - Khan Uul
      let markerKhanUul = new Feature({
        geometry: new Point(fromLonLat([106.895121, 47.898304])),
        name: "Khan Uul",
        tel: "60661076",
        address: "Khan Uul",
      });

      let myStyle = new Style({
        text: new Text({
          text: "Khan Uul",
          font: "bold 14px sans-serif",
          offsetY: 10,
        }),

        image: new Icon({
          anchor: [0.5, 1],
          src: svgIcon,
          scale: 1.0,
        }),
      });
      markerKhanUul.setStyle(myStyle);

      // Create marker feature, Point - Park Star
      let markerParkStar = new Feature({
        geometry: new Point(fromLonLat([106.9348699, 47.9196281])),
        name: "Park Star",
        tel: "99038803",
        address: "Park Star",
      });

      let parkStarStyle = new Style({
        text: new Text({
          text: "Park Star",
          font: "bold 14px sans-serif",
          offsetY: 10,
        }),

        image: new Icon({
          anchor: [0.5, 1],
          src: svgIcon,
          scale: 1.0,
        }),
      });
      markerParkStar.setStyle(parkStarStyle);

      // create a vector layer and add the marker feature to it
      const markerLayer = new Vector({
        source: new VectorSource({
          features: [markerKhanUul, markerParkStar],
        }),
      });

      // add myLayer
      map.addLayer(markerLayer);


      //Click event on the map
      map.on("click", function (evt) {
        map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
          const coordinate = feature.getGeometry().getCoordinates();
          const attributes = feature.getProperties();
          const name = feature.get("name");
          const tel = feature.get("tel");
          const address = feature.get("address");
          // create popup with name and tel attributes
          const popup = new Overlay({
            position: attributes.geometry.flatCoordinates,
            element: document.createElement("div"),
          });

          const content = document.createElement("div");
          content.innerHTML = `
          <div class="card w-full bg-slate-100 py-3 px-5 shadow-xl rounded-lg">
            <div class="card-body">
            <button class="px-2 border border-gray-900 rounded-lg btn-xs md:btn-sm bg-base-100 bg-slate-50 text-gray-700 font-bold hover:text-gray-200 popup-close">
            X
            </button>
              <div class="grid text-xs md:text-sm">
                <div>${name}</div>
                <div>${tel}</div>
                <div>${address}</div>
              </div>
            </div>
          </div>
        `;

        popup.getElement()?.appendChild(content);
        map.addOverlay(popup)

        const closeButton = content.querySelector(".popup-close");
        closeButton?.addEventListener("click", () => {
          map.removeOverlay(popup);
        });
        
        });
        
      })
    });
    
  return (
      <div id="map" style={{ width: '80vw', height: '80vh' }}></div>
  );
}
