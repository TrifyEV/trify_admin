import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { getVehicleJourney } from "../api/admin.api";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { MapComponentContainer } from "./MapView.style";

const MapComponent: React.FC<{
  date: dayjs.Dayjs | null;
  journey: number;
  bikeID: number;
  setJourneyCount: (count: number) => void;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ bikeID, date, journey, setJourneyCount, setIsLoadingData }) => {
  const [reRenderRoute, setRerenderRoute] = useState(false);

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

  useEffect(() => {
    setRerenderRoute(true);
    setTimeout(() => {
      setRerenderRoute(false);
    }, 10);
  }, [journey]);

  const locations = useMemo(() => {
    if (!data) return [];
    const journeyData = data[journey + 1];
    if (!journeyData) return [];
    return journeyData.map((data) => L.latLng([data.lat, data.long]));
  }, [data, journey]);

  return (
    <MapComponentContainer>
      <MapContainer
        center={[0.347596, 32.58252]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.length === 1 ? <Marker position={locations[0]} /> : null}
        {!reRenderRoute && <Routing waypoints={locations} />}
      </MapContainer>
    </MapComponentContainer>
  );
};

export const Routing: React.FC<{ waypoints: L.LatLng[] }> = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [...waypoints],
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
