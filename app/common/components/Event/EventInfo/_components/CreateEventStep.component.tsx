"use client";

import { Check, Close, InfoOutlined, PersonAddAltOutlined, PlaceOutlined } from "@mui/icons-material";
import { Stack, Step, StepConnector, StepLabel, Stepper, Typography, stepConnectorClasses } from "@mui/material";
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
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; error?: boolean };
}>(({ theme }) => ({
  color: theme.palette.text.secondary,
  zIndex: 1,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }: any) => ownerState.active || ownerState.completed,
      style: {
        color: green[400],
      },
    },
    {
      props: ({ ownerState }: any) => ownerState.error,
      style: {
        color: red[400],
      },
    },
  ],
}));

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

const steps = ["Details", "Date and location", "Invite"];

export const CreateEventStep = ({ step, errorStep }: { step: number; errorStep?: number }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Stepper activeStep={step} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              error={index === errorStep}
              StepIconComponent={ColorlibStepIcon}
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
