import dayjs from "dayjs";
import React from "react";

const MapComponent: React.FC<{
  date: dayjs.Dayjs | null;
  journey: number;
  setJourneyCount: React.Dispatch<React.SetStateAction<number>>;
  bikeID: number;
}> = () => {
  return <div>MapComponent</div>;
};

export default MapComponent;
