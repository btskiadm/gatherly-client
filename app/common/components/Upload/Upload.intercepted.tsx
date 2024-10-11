"use client";

import { delay } from "@/app/common/utils/delay";
import { Box, Stack } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { UploadZoneModal } from "./Upload.modal";
import { UploadCrop, UploadCropRef } from "./_components/UploadCrop.component";
import { UploadStep } from "./_components/UploadStep.component";
import { UploadSuccess } from "./_components/UploadSuccess.component";
import { UploadZone, UploadZoneRef } from "./_components/UploadZone.component";

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

  const confirm = useMemo(() => {
    // choose photo
    if (step === 0) {
      return;
    }

    // upload
    if (step === 1) {
      return {
        onConfirm: async () => {
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

    // success and confirm
    return {
      onConfirm: () => {
        onConfirm?.(fileRef.current!);
      },
      text: "Done",
    };
  }, [step, zoneUrl, filename, handleCancel, onConfirm]);

  const back = useMemo(() => {
    if (step === 0) {
      return;
    }

    return {
      onBack: () => {
        setStep((prev) => --prev);
      },
    };
  }, [step]);

  const cancel = useMemo(
    () => ({
      onCancel: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <UploadZoneModal open={open ?? true} loading={loading} back={back} cancel={cancel} confirm={confirm}>
      <Stack gap={3} width="100%">
        <UploadStep step={step} errorStep={errorStep} />
        <Box
          sx={{
            display: step === 0 ? "block" : "none",
          }}
        >
          <UploadZone
            ref={uploadZoneRef}
            onUploaded={(data) => {
              setZoneUrl(data?.url as string);
              setFilename(data?.filename!);
              setStep((prev) => ++prev);
            }}
          />
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
    </UploadZoneModal>
  );
};
