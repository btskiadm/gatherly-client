"use client";

import { delay } from "@/app/common/utils/delay";
import { XOR } from "@/app/common/utils/essentials";
import { SearchCategoryDto } from "@/app/mock/mock-api.types";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { InviteMember, InviteMemberRef } from "../../InviteMember/_components/InviteMember";
import { ModalTemplate } from "../../Modal/modal-template";
import {
  CreateEventDateAndLocation,
  CreateEventDateAndLocationRef,
} from "./_components/create-event-date-and-location-component";
import { CreateEventDetails, CreateEventDetailsRef } from "./_components/create-event-details-component";
import { CreateEventStep, CreateEventSteps } from "./_components/create-event-step-component";

export interface CreateEventInit {
  type: "edit";
  details: {
    name: string;
    description: string;
    categories: SearchCategoryDto[];
  };
  dateAndLocation: {
    date: string;
    from: string;
    to: string;
  };
}

type Props = XOR<CreateEventInit, {}>;

const isEditProps = (props: Props) => props.type === "edit";

const createSteps: CreateEventSteps = ["Details", "Date and location", "Invite"];
const editSteps: CreateEventSteps = ["Details", "Date and location"];

export const CreateEventIntercepted = (props: Props) => {
  const isEdit = useRef(isEditProps(props));
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
          console.log("[debug]:", data);
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

    if (step === 1 && !isEdit.current) {
      return {
        onAction: () => {
          const data = dateAndLocationRef.current?.next();
          console.log("[debug]:", data);
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

    if (step === 1 && isEdit.current) {
      return {
        onAction: async () => {
          const data = dateAndLocationRef.current?.next();
          console.log("[debug]:", data);
          if (!data?.success) {
            setErrorStep(1);
            return;
          }

          setErrorStep(-1);
          setLoading(true);
          await delay(2000);
          setLoading(false);
          handleCancel();
        },
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
      title={isEdit.current ? "Edit event" : "Create a new event"}
      loading={loading}
      back={back}
      cancel={cancel}
      confirm={nextAndConfirm}
    >
      <Stack gap={3} width="100%">
        <CreateEventStep step={step} errorStep={errorStep} steps={isEdit.current ? editSteps : createSteps} />
        <Box
          sx={{
            display: step === 0 ? "block" : "none",
          }}
        >
          <CreateEventDetails ref={detailsRef} {...(props.details ?? {})} />
        </Box>
        <Box
          sx={{
            display: step === 1 ? "block" : "none",
          }}
        >
          <CreateEventDateAndLocation ref={dateAndLocationRef} {...(props.dateAndLocation ?? {})} />
        </Box>
        {!isEdit.current && (
          <Box
            sx={{
              display: step === 2 ? "block" : "none",
            }}
          >
            <InviteMember ref={inviteRef} />
          </Box>
        )}
      </Stack>
    </ModalTemplate>
  );
};
