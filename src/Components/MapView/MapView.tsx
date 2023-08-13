import React, { useState } from "react";
import MapComponent from "./MapComponent";
import Timeline from "./Timeline";
import { MapContainer, TimelineContainer } from "./MapView.style";
import { Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const MapView: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [journey, setJourney] = useState(0);
  const [journeyCount, setJourneyCount] = useState(4);
  const [bikeID, setBikeID] = useState(1);

  return (
    <Stack>
      <MapContainer>
        <MapComponent
          date={date}
          journey={journey}
          setJourneyCount={setJourneyCount}
          bikeID={bikeID}
        />
      </MapContainer>
      <TimelineContainer>
        <Timeline
          setDate={setDate}
          setJourney={setJourney}
          journeyCount={journeyCount}
          setBikeID={setBikeID}
        />
      </TimelineContainer>
    </Stack>
  );
};

export default MapView;
