import { FormHelperText, styled } from "@mui/material";

export const TruncatedFormHelperText = styled(FormHelperText)`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
