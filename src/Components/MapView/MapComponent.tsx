import dayjs from "dayjs";
import React, { useEffect } from "react";
import useSWR from "swr";
import { getVehicleJourney } from "../api/admin.api";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { MapComponentContainer } from "./MapView.style";

const MapComponent: React.FC<{
  date: dayjs.Dayjs | null;
  journey: number;
  bikeID: number;
  setJourneyCount: (count: number) => void;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ bikeID, date, setJourneyCount, setIsLoadingData }) => {
  const { data, isLoading } = useSWR(
    `get-vehicle-journey-${bikeID}-${date?.format("YYYY-MM-DD")}`,
    () => {
      if (bikeID && date) {
        return getVehicleJourney(bikeID, "2023-01-01", "2023-12-31");
      }
    }
  );

  useEffect(() => {
    if (data) {
      console.log("data length", Object.getOwnPropertyNames(data).length);
      setJourneyCount(Object.getOwnPropertyNames(data).length);
    } else {
      setJourneyCount(0);
    }
  }, [data]);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  return (
    <MapComponentContainer>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing />
      </MapContainer>
    </MapComponentContainer>
  );
};

export const Routing: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949),
        L.latLng(57.6345, 11.949),
      ],
      lineOptions: {
        styles: [{ color: "#ff8c00", weight: 4 }],
        extendToWaypoints: false,
        missingRouteTolerance: 100,
      },
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
};

export default MapComponent;
