"use client";

import { delay } from "@/app/common/utils/delay";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { InviteMember, InviteMemberRef } from "../../InviteMember/_components/InviteMember.components";
import { CreateEventModal } from "./CreateEvent.modal";
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
      onBack: () => {
        setStep((prev) => --prev);
      },
    };
  }, [step]);

  const next = useMemo(() => {
    if (step === 2) {
      return undefined;
    }

    return {
      onNext: async () => {
        if (step === 0) {
          const data = detailsRef.current?.next();
          if (!data?.success) {
            setErrorStep(0);
            return;
          }
          setErrorStep(-1);
        } else if (step === 1) {
          const data = dateAndLocationRef.current?.next();
          if (!data?.success) {
            setErrorStep(1);
            return;
          }
          setErrorStep(-1);
        }

        setStep((prev) => ++prev);
      },
    };
  }, [step]);

  const create = useMemo(() => {
    if (step < 2) {
      return undefined;
    }

    return {
      onCreate: async () => {
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
      onCancel: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <CreateEventModal open={true} loading={loading} back={back} next={next} cancel={cancel} create={create}>
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
    </CreateEventModal>
  );
};
