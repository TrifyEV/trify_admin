import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { StepLabel } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

export const TimelineChartComponent: React.FC<{
  setJourney: React.Dispatch<React.SetStateAction<number>>;
  journeyCount: number;
}> = ({ setJourney, journeyCount }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const CustomMapIcon = () => <MapIcon style={{ color: "orange" }} />;

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    setJourney(step);
  };

  return (
    <Box sx={{ maxWidth: "100%", overflow: "scroll" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            color: "orange",
          },
        }}
      >
        {[...Array(journeyCount)].map((x, i) => {
          return (
            <Step>
              <StepButton onClick={handleStep(i)}>Journey {i + 1}</StepButton>
            </Step>
          );
        })}
        <Step>
          <StepButton onClick={handleStep(journeyCount)}>
            <StepLabel StepIconComponent={CustomMapIcon}>All</StepLabel>
          </StepButton>
        </Step>
      </Stepper>
    </Box>
  );
};
