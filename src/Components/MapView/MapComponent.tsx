import dayjs from "dayjs";
import React, { useEffect } from "react";
import useSWR from "swr";
import { getVehicleJourney } from "../api/admin.api";

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

  return <>MapComponent</>;
};

export default MapComponent;
