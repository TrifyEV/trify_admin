import { doGet } from ".";
import API_CONSTANTS from "./constants";

interface LocationInfo {
  lat: number;
  long: number;
  speed: number;
}

export interface VehicleLocations {
  [journeyId: number]: LocationInfo[];
}

export const getVehicleJourney = (
  vehicle_id: number,
  start_date: string,
  end_date: string
) =>
  doGet<VehicleLocations>(API_CONSTANTS.GET_VEHICALE_JOURNEY, {
    vehicle_id,
    start_date,
    end_date,
  });
