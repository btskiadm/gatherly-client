"use client";

import getCroppedImg from "@/app/common/utils/file";
import { RotateLeft, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;

interface Props {
  img: string;
  filename: string;
  aspect?: string;
}

interface UploadCropData {
  success: boolean;
  date?: {
    file: File;
  };
}

export interface UploadCropRef {
  getData(): Promise<UploadCropData>;
}

export const UploadCrop = forwardRef<UploadCropRef, Props>(({ img, filename, aspect = 1 }, componentRef) => {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    height: NaN,
    width: NaN,
    x: NaN,
    y: NaN,
  });

  const zoomIn = useCallback(() => {
    setZoom((prev) => (prev > MAX_ZOOM ? MAX_ZOOM : prev + 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => (prev < MIN_ZOOM ? MIN_ZOOM : prev - 1));
  }, []);

  const rotate = useCallback(() => {
    setRotation((prev) => prev + 90);
  }, []);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getData = async (): Promise<UploadCropData> => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation);
      const success = !!croppedImage;

      if (!success) {
        return {
          success,
        };
      }

      return {
        success,
        date: {
          file: new File([croppedImage], filename),
        },
      };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  useImperativeHandle(
    componentRef,
    () => ({
      getData,
    }),
    [getData]
  );

  return (
    <Stack alignItems="center" gap={2}>
      <Box
        height={{
          xs: "240px",
          sm: "360px",
        }}
        width="100%"
        position="relative"
      >
        <Cropper
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          image={img as string}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <Stack direction="row" gap={2} width="100%">
        <Stack width="100%" gap={2} direction="row" alignItems="center">
          <IconButton size="small" onClick={zoomOut}>
            <ZoomOut />
          </IconButton>
          <Slider min={MIN_ZOOM} max={MAX_ZOOM} value={zoom} onChange={(_, value) => setZoom(value as number)} />
          <IconButton size="small" onClick={zoomIn}>
            <ZoomIn />
          </IconButton>
        </Stack>
        <IconButton size="small" onClick={rotate}>
          <RotateLeft />
        </IconButton>
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          whiteSpace: "wrap",
          textAlign: "center",
        }}
      >
        Te zdjęcia muszą być w formacie JPEG, GIF lub PNG, mieć mniej niż 15 MB i być zgodne z Warunki świadczenia
        usług.
      </Typography>
    </Stack>
  );
});
