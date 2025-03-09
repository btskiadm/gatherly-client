"use client";

import { delay } from "@/app/common/utils/delay";
import { XOR } from "@/app/common/utils/essentials";
import { Category } from "@/app/model/model";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { InviteMember, InviteMemberRef } from "../../InviteMember/InviteMember";
import { ModalTemplate } from "../../Modal/modal-template";
import CreateEventDateAndLocation, { CreateEventDateAndLocationRef } from "./_components/CreateEventDateAndLocation";
import CreateEventDetails, { CreateEventDetailsRef } from "./_components/CreateEventDetails";
import { CreateEventStep, CreateEventSteps } from "./_components/CreateEventStep";
import { useMutation } from "@tanstack/react-query";
import { createEventMutationFn } from "@/app/common/graphql/options/mutation/createEventMutationFn";

export interface CreateEventInit {
  type: "edit";
  details: {
    name: string;
    description: string;
    categories: Category[];
  };
  dateAndLocation: {
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    allDay: boolean;
  };
}

type Props = XOR<CreateEventInit, {}> & { groupId: string };

const isEditProps = (props: Props) => props.type === "edit";

const createSteps: CreateEventSteps = ["Details", "Date and location", "Invite"];
const editSteps: CreateEventSteps = ["Details", "Date and location"];

export const CreateEventInterceptedModal = (props: Props) => {
  const mutation = useMutation({
    mutationFn: createEventMutationFn,
  });

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
        setStep((prev) => prev - 1);
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
          setStep((prev) => prev + 1);
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
          setStep((prev) => prev + 1);
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
        text: "Confirm",
      };
    }

    return {
      onAction: async () => {
        const inviteRefData = inviteRef.current?.invite();
        if (!inviteRefData?.success) {
          setErrorStep(2);
          return;
        }
        setErrorStep(-1);
        setLoading(true);

        const dateAndLocationRefData = dateAndLocationRef.current!.next();
        const detailsRefData = detailsRef.current!.next();

        if (dateAndLocationRefData.success && detailsRefData.success && inviteRefData.success) {
          const { allDay, dateFrom, dateTo, timeFrom, timeTo, city } = dateAndLocationRefData.data!;
          const { categories, description, name } = detailsRefData.data!;
          const { inviteIds } = inviteRefData.data!;

          await mutation.mutateAsync({
            groupId: props.groupId,
            createEventInput: {
              title: name,
              description,
              categories,
              cities: [city],
              startAt: new Date(`${dateFrom}T${timeFrom}Z`),
              endAt: new Date(`${dateTo}T${timeTo}Z`),
            },
          });
        }

        setLoading(false);
        handleCancel();
      },
      text: "Confirm",
    };
  }, [step, handleCancel]);

  const cancel = useMemo(() => ({ onAction: handleCancel }), [handleCancel]);

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
        <Box sx={{ display: step === 0 ? "block" : "none" }}>
          <CreateEventDetails ref={detailsRef} {...(props.details ?? {})} />
        </Box>
        <Box sx={{ display: step === 1 ? "block" : "none" }}>
          <CreateEventDateAndLocation ref={dateAndLocationRef} {...(props.dateAndLocation ?? {})} />
        </Box>
        {!isEdit.current && (
          <Box sx={{ display: step === 2 ? "block" : "none" }}>
            <InviteMember ref={inviteRef} />
          </Box>
        )}
      </Stack>
    </ModalTemplate>
  );
};
