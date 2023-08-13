import React, { useMemo, useState } from "react";
import MapComponent from "./MapComponent";
import Timeline from "./Timeline";
import { MapContainer, TimelineContainer } from "./MapView.style";
import { Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import useSWR from "swr";
import { getVehicleJourney } from "../api/admin.api";

const MapView: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [journey, setJourney] = useState(0);
  const [bikeID, setBikeID] = useState(4);

  const { data, isLoading } = useSWR(
    `get-vehicle-journey-${bikeID}-${date?.format("YYYY-MM-DD")}`,
    () => {
      if (bikeID && date) {
        return getVehicleJourney(bikeID, "2023-01-01", "2023-12-31");
      }
    }
  );

  const journeyCount = useMemo(() => {
    if (data) {
      return Object.keys(data).length;
    }
    return 0;
  }, [data]);

  return (
    <Stack>
      <MapContainer>
        <MapComponent date={date} journey={journey} bikeID={bikeID} />
      </MapContainer>
      <TimelineContainer>
        <Timeline
          setDate={setDate}
          setJourney={setJourney}
          journeyCount={journeyCount}
          setBikeID={setBikeID}
          isLoadingData={isLoading}
        />
      </TimelineContainer>
    </Stack>
  );
};

export default MapView;
