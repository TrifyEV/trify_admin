import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { MapComponentContainer } from "./MapView.style";
import { VehicleLocations } from "../api/admin.api";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const fetchroutes: (
  bikeID: number,
  startData: string,
  endDate: string
) => Promise<VehicleLocations> = async (
  bikeID: number,
  startData: string,
  endDate: string
) => {
  const uri =
    import.meta.env.VITE_BACKEND_ENDPOINT +
    `/api/admin/vehicle_journey?vehicle_id=${bikeID}&start_date=${startData}&end_date=${endDate}&step=3`;
  return await fetch(uri).then((res) => res.json());
};

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
        return fetchroutes(bikeID, "2023-01-01", "2023-12-31");
      }
    }
  );

  useEffect(() => {
    if (data) {
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
  }, [journey, data]);

  const locations = useMemo(() => {
    if (!data) return [];
    const journeyKey = parseInt(Object.keys(data)?.[journey]);
    if (!journeyKey || isNaN(journeyKey)) return [];
    const journeyData = data[journeyKey];
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
        styles: [{ color: "#0e60b3", weight: 8 }],
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
