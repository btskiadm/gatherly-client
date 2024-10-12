"use client";

import { delay } from "@/app/common/utils/delay";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { InviteMember, InviteMemberRef } from "../../InviteMember/_components/InviteMember.components";
import { ModalTemplate } from "../../Modal/ModalTemplate";
import {
  CreateEventDateAndLocation,
  CreateEventDateAndLocationRef,
} from "./_components/CreateEventDateAndLocation.component";
import { CreateEventDetails, CreateEventDetailsRef } from "./_components/CreateEventDetails.component";
import { CreateEventStep } from "./_components/CreateEventStep.component";

export const CreaetEventIntercepted = () => {
  const [step, setStep] = useState(0);
  const [errorStep, setErrorStep] = useState(-1);
  const [loading, setLoading] = useState(false);
  const detailsRef = useRef<CreateEventDetailsRef>(null);
  const dateAndLocationRef = useRef<CreateEventDateAndLocationRef>(null);
  const inviteRef = useRef<InviteMemberRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const back = useMemo(() => {
    if (step === 0) {
      return undefined;
    }
    return {
      onAction: () => {
        setStep((prev) => --prev);
      },
    };
  }, [step]);

  const nextAndConfirm = useMemo(() => {
    if (step === 0) {
      return {
        onAction: () => {
          const data = detailsRef.current?.next();
          if (!data?.success) {
            setErrorStep(0);
            return;
          }

          setErrorStep(-1);
          setStep((prev) => ++prev);
        },
        text: "Next",
      };
    }

    if (step === 1) {
      return {
        onAction: () => {
          const data = dateAndLocationRef.current?.next();
          if (!data?.success) {
            setErrorStep(1);
            return;
          }

          setErrorStep(-1);
          setStep((prev) => ++prev);
        },
        text: "Next",
      };
    }

    return {
      onAction: async () => {
        const data = inviteRef.current?.invite();

        if (!data?.success) {
          setErrorStep(2);
          return;
        }

        setErrorStep(-1);
        setLoading(true);
        await delay(2000);
        setLoading(false);
        handleCancel();
      },
    };
  }, [step, handleCancel]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <ModalTemplate
      open
      title="Create a new event"
      loading={loading}
      back={back}
      cancel={cancel}
      confirm={nextAndConfirm}
    >
      <Stack gap={3} width="100%">
        <CreateEventStep step={step} errorStep={errorStep} />
        <Box
          sx={{
            display: step === 0 ? "block" : "none",
          }}
        >
          <CreateEventDetails ref={detailsRef}></CreateEventDetails>
        </Box>
        <Box
          sx={{
            display: step === 1 ? "block" : "none",
          }}
        >
          <CreateEventDateAndLocation ref={dateAndLocationRef} />
        </Box>
        <Box
          sx={{
            display: step === 2 ? "block" : "none",
          }}
        >
          <InviteMember ref={inviteRef} />
        </Box>
      </Stack>
    </ModalTemplate>
  );
};
