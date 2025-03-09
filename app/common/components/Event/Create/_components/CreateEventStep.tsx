"use client";

import { InfoOutlined, PersonAddAltOutlined, PlaceOutlined } from "@mui/icons-material";
import { Stack, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import { green, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: green[400],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: green[400],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; error?: boolean };
}>(({ theme, ownerState }) => {
  let color = theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.text.secondary;
  if (ownerState.error) {
    color = red[400];
  } else if (ownerState.active || ownerState.completed) {
    color = green[400];
  }
  return {
    color,
    zIndex: 1,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  };
});

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, error } = props;

  const icons: { [index: string]: React.ReactElement<any> } = {
    1: <InfoOutlined />,
    2: <PlaceOutlined />,
    3: <PersonAddAltOutlined />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export type CreateEventSteps = [string, string, string?];

export const CreateEventStep = ({
  step,
  errorStep,
  steps,
}: {
  step: number;
  errorStep?: number;
  steps: CreateEventSteps;
}) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Stepper activeStep={step} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              error={index === errorStep}
              slots={{
                stepIcon: ColorlibStepIcon,
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                },
                "& .Mui-error": {
                  color: red[400],
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
