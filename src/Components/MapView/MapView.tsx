import React, { useCallback, useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import Timeline from "./Timeline";
import { MapContainer, TimelineContainer } from "./MapView.style";
import { Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const MapView: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [journey, setJourney] = useState(0);
  const [bikeID, setBikeID] = useState(4);
  const [journeyCount, setJourneyCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const updateJourneyCount = useCallback((count: number) => {
    setJourneyCount(count);
  }, []);

  useEffect(() => {
    console.log("journeyCount in map view", journeyCount);
  }, [journeyCount]);

  return (
    <Stack>
      <MapContainer>
        <MapComponent
          date={date}
          journey={journey}
          bikeID={bikeID}
          setJourneyCount={updateJourneyCount}
          setIsLoadingData={setIsLoadingData}
        />
      </MapContainer>
      <TimelineContainer>
        <Timeline
          setDate={setDate}
          setJourney={setJourney}
          journeyCount={journeyCount}
          setBikeID={setBikeID}
          isLoadingData={isLoadingData}
        />
      </TimelineContainer>
    </Stack>
  );
};

export default MapView;
