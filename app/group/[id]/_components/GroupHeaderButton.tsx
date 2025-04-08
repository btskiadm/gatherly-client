"use client";

import { Link } from "@/app/common/components/next-link";
import { joinGroupMutationFn } from "@/app/common/graphql/options/mutation/joinGroupMutationFn";
import { leaveGroupMutationFn } from "@/app/common/graphql/options/mutation/leaveGroupMutationFn";
import {
  checkUserGroupPermissions,
  checkUserGroupPermissionsQueryKey,
} from "@/app/common/graphql/options/query/checkUserGroupPermissions";
import { getRole } from "@/app/common/utils/role";
import {
  ArrowDropDown,
  GroupAdd,
  InsertInvitationOutlined,
  LogoutOutlined,
  PersonAddAltOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Divider, Menu, MenuItem } from "@mui/material";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

export const GroupHeaderButton = () => {
  const queryClient = useQueryClient();

  const { id }: { id: string } = useParams();
  const { data, isLoading } = useSuspenseQuery(checkUserGroupPermissions({ groupId: id }));

  const leaveMutation = useMutation({
    mutationFn: leaveGroupMutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: checkUserGroupPermissionsQueryKey(id),
      });
    },
  });

  const joinMutation = useMutation({
    mutationFn: joinGroupMutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: checkUserGroupPermissionsQueryKey(id),
      });
    },
  });
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const role = data.checkUserGroupPermissions.role;
  const { isHost, isMember, isModerator, isNone } = getRole(role);
  const showLeave = !isHost && (isMember || isModerator);
  const showManagmentPanel = isModerator || isHost;
  const showNewEvent = isModerator || isHost;

  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const handleArrowDownClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      setAnchor(e.currentTarget);
    },
    [isHost, isMember, isModerator, isNone, id]
  );

  const handleButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      if (isNone) {
        // todo: fix confirm
        await joinMutation.mutateAsync({ groupId: id });
      }
    },
    [isNone, id]
  );

  const handleLeave = useCallback(async () => {
    handleClose();

    // todo: fix confirm
    const confirmed = confirm("Are you sure you want to leave this group ?");

    if (!confirmed) {
      return;
    }

    await leaveMutation.mutateAsync({
      groupId: id,
    });
  }, [id]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            "& .MuiMenuItem-root": {
              "& .MuiSvgIcon-root": {
                marginRight: (theme) => theme.spacing(1),
              },
            },
          },
        }}
      >
        {(isMember || isModerator || isHost) && (
          <Link href="invite" underline="none">
            <MenuItem disableRipple onClick={handleClose} sx={{ color: "text.primary" }}>
              <GroupAdd color="action" />
              Invite
            </MenuItem>
          </Link>
        )}

        <Link
          underline="none"
          href={{
            pathname: "/report",
            query: {
              type: "group",
              id: "123-456-789",
            },
          }}
        >
          <MenuItem disableRipple onClick={handleClose} sx={{ color: "text.primary" }}>
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
        {showLeave && (
          <MenuItem disableRipple onClick={handleLeave} sx={{ color: "error.main" }}>
            <LogoutOutlined color="error" />
            Leave
          </MenuItem>
        )}

        {showManagmentPanel && <Divider />}

        {showNewEvent && (
          <Link href="createEvent" underline="none">
            <MenuItem disableRipple onClick={handleLeave} sx={{ color: "text.primary" }}>
              <InsertInvitationOutlined color="action" />
              New event
            </MenuItem>
          </Link>
        )}
      </Menu>

      <ButtonGroup disabled={isLoading} variant="outlined">
        <LoadingButton
          loading={isLoading}
          onClick={handleButtonClick}
          startIcon={isNone ? <PersonAddAltOutlined /> : null}
          sx={{
            height: "min-content",
          }}
        >
          {isNone && "Join"}
          {isMember && "Member"}
          {isModerator && "Moderator"}
          {isHost && "Host"}
        </LoadingButton>
        <Button size="small" onClick={handleArrowDownClick}>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
    </>
  );
};
