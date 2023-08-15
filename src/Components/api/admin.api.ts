import instance from "./axiosInstance";

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
  instance.get<VehicleLocations>(
    `/api/admin/vehicle_journey?vehicle_id=${vehicle_id}&start_date=${start_date}&end_date=${end_date}&step=3`
  );
