import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { readFile } from "../../../utils/file";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 2,
  p: 2,
  borderColor: "#666",
  borderStyle: "dashed",
  outline: "none",
  transition: "border .2s ease-in-out",
};

const Zone = styled(Stack)(
  ({ theme }) => `
  flex: 1;
  display: flex;
  flexDirection: column;
  align-items: center;
  border-width: 2px;
  padding: ${theme.spacing(2)};
  border-color: ${theme.palette.divider};
  background-color: ${theme.palette.background.light}
  borde-style: dashed;
  outline: none;
  transition: border .24s ease-in-out;`
);

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

type UploadZoneUrl = string | ArrayBuffer | null;

export interface UploadZoneData {
  success: boolean;
  data?: {
    filename: string;
    url: UploadZoneUrl;
  };
}

export interface UploadZoneRef {
  getData(): UploadZoneData;
}

interface Props {
  onUploaded?(data: UploadZoneData["data"]): void;
}

export const UploadZone = forwardRef<UploadZoneRef, Props>(({ onUploaded }, componentRef) => {
  const urlRef = useRef<UploadZoneUrl>(null);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    async onDropAccepted(files) {
      urlRef.current = await readFile(files[0]);
      onUploaded?.({ filename: files[0].name, url: urlRef.current });
    },
    accept: { "image/*": [] },
  });

  const getData = useCallback(() => {
    if (acceptedFiles.length <= 0) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: {
        url: urlRef.current,
        filename: acceptedFiles[0].name,
      },
    };
  }, [acceptedFiles]);

  useImperativeHandle(
    componentRef,
    () => ({
      getData,
    }),
    [getData]
  );

  const { ref, ...rootProps } = getRootProps();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box ref={ref}>
      <Zone gap={2} alignItems="center" {...rootProps} sx={{ ...style }}>
        <input {...getInputProps()} />
        <CloudUploadOutlined
          sx={{
            color: "text.secondary",
            fontSize: "6rem",
          }}
        />
        <Typography variant="h6" color="text.primary">
          Dodaj zdjęcie
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            whiteSpace: "wrap",
            textAlign: "center",
          }}
        >
          Przeciągnij i upuść zdjęcie lub kliknij przycisk poniżej, aby wybrać zdjęcie, które chcesz przesłać.
        </Typography>
        <Button variant="outlined">Load image</Button>
      </Zone>
    </Box>
  );
});
