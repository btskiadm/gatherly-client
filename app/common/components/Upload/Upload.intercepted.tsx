"use client";

import { delay } from "@/app/common/utils/delay";
import { Box, Stack } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { ModalTemplate } from "../Modal/ModalTemplate";
import { UploadCrop, UploadCropRef } from "./_components/UploadCrop.component";
import { UploadStep } from "./_components/UploadStep.component";
import { UploadSuccess } from "./_components/UploadSuccess.component";
import { UploadZone, UploadZoneData, UploadZoneRef } from "./_components/UploadZone.component";

interface Props {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: (file: File) => void;
}

export const UploadIntercepted = ({ open, onClose, onConfirm }: Props) => {
  const fileRef = useRef<File | null>(null);
  const [step, setStep] = useState(0);
  const [zoneUrl, setZoneUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [errorStep, setErrorStep] = useState(-1);
  const [loading, setLoading] = useState(false);
  const uploadZoneRef = useRef<UploadZoneRef>(null);
  const uploadCropRef = useRef<UploadCropRef>(null);

  const handleCancel = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const uploadAndDone = useMemo(() => {
    // choose photo - no confirm and next button, this is handled by callback onUploaded
    if (step === 0) {
      return;
    }

    // Crop view
    if (step === 1) {
      return {
        onAction: async () => {
          const data = await uploadCropRef.current?.getData();

          if (!data?.success) {
            setErrorStep(1);
            return;
          }

          setLoading(true);
          await delay(2000);
          setLoading(false);

          fileRef.current = data.date?.file!;

          setErrorStep(-1);
          setStep((prev) => ++prev);
        },
        text: "Upload",
      };
    }

    // Success and confirm view
    return {
      onAction: () => {
        onConfirm?.(fileRef.current!);
      },
      text: "Done",
    };
  }, [step, onConfirm]);

  const back = useMemo(() => {
    if (step === 0) {
      return;
    }

    return {
      onAction: () => {
        setStep((prev) => --prev);
      },
    };
  }, [step]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  const handleUploadZone = useCallback((data: UploadZoneData["data"]) => {
    setZoneUrl(data?.url as string);
    setFilename(data?.filename!);
    setStep((prev) => ++prev);
  }, []);

  return (
    <ModalTemplate
      title="Upload photo"
      open={open ?? true}
      loading={loading}
      back={back}
      cancel={cancel}
      confirm={uploadAndDone}
    >
      <Stack gap={3} width="100%">
        <UploadStep step={step} errorStep={errorStep} />
        <Box
          sx={{
            display: step === 0 ? "block" : "none",
          }}
        >
          <UploadZone ref={uploadZoneRef} onUploaded={handleUploadZone} />
        </Box>
        <Box
          sx={{
            display: step === 1 ? "block" : "none",
          }}
        >
          <UploadCrop ref={uploadCropRef} img={zoneUrl} filename={filename} />
        </Box>
        <Box
          sx={{
            display: step === 2 ? "block" : "none",
          }}
        >
          <UploadSuccess />
        </Box>
      </Stack>
    </ModalTemplate>
  );
};
