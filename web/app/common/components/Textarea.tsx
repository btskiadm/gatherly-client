import { TextareaAutosize, styled } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
      box-sizing: border-box;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 4px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        border-color: ${blue[500]};
        box-shadow: 0 0 0 1px ${theme.palette.mode === "dark" ? blue[600] : blue[800]};
      }
  
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `
);
