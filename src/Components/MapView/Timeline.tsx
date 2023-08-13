import { Stack, TextField } from "@mui/material";
import React from "react";
import DateDropdown from "../common/FormsUI/DatePicker";
import dayjs from "dayjs";
import logo from "../../assets/bike.png";
import { TimelineChartComponent } from "./TimelineChartComponent";
import Spinner from "../common/spiner";

const Timeline: React.FC<{
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setJourney: React.Dispatch<React.SetStateAction<number>>;
  journeyCount: number;
  setBikeID: React.Dispatch<React.SetStateAction<number>>;
  isLoadingData: boolean;
}> = ({ setDate, setBikeID, journeyCount, setJourney, isLoadingData }) => {
  return (
    <div className="timeline">
      <div className="card text-white bg-light mb-3 border-0">
        <div
          className="card-header"
          style={{ color: "orange", fontSize: 36, marginLeft: "0px" }}
        >
          <img
            src={logo}
            style={{
              width: "35%",
              height: "35%",
              objectFit: "contain",
              textAlign: "left",
            }}
          />
          Timeline
        </div>
        <div className="card-body">
          <h2 style={{ color: "orange" }}>Bike Journey View</h2>
          <br />

          <Stack direction={"row"} gap={2}>
            <DateDropdown
              label="Select Date"
              defaultValue={dayjs()}
              onChange={(newValue) => setDate(newValue)}
            />
            <TextField
              id="outlined-basic"
              label="Bike ID"
              variant="outlined"
              defaultValue={1}
              onChange={(e) => setBikeID(parseInt(e.target.value))}
            />
          </Stack>

          <br />
          {isLoadingData ? (
            <Spinner />
          ) : (
            <TimelineChartComponent
              journeyCount={journeyCount}
              setJourney={setJourney}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
